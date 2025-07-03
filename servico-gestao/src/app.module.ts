import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoModule } from './plano.module';
import { ClienteModule } from './cliente.module';
import { PlanoMessagingController } from './infraestrutura/messaging/plano.messaging.controller';
import { CobrancaMessagingController } from './infraestrutura/messaging/cobranca.messaging.controller';
import { AtualizarStatusPlanoUseCase } from './aplicacao/use-cases/atualizar-status-plano.use-case';
import { PlanoEntity } from './dominio/plano.entity.typeorm';
import { ClienteEntity } from './dominio/cliente.entity.typeorm';
import { ClienteRepositoryMySQL } from './infraestrutura/repositories/cliente.repository.mysql';
import { PlanoRepositoryMySQL } from './infraestrutura/repositories/plano.repository.mysql';
import { CLIENTE_REPOSITORY } from './dominio/cliente.repository.interface';
import { PLANO_REPOSITORY } from './dominio/plano.repository.interface';
import { GerarRelatorioClientesUseCase } from './aplicacao/use-cases/gerar-relatorio-clientes.use-case';
import { RelatorioController } from './interfaces/controllers/relatorio.controller';
import { PlanoAtivoMessagingController } from './infraestrutura/messaging/PlanoAtivoMessagingController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('TypeOrmConfig');
        try {
          const entities = [PlanoEntity, ClienteEntity];
          
          const config = {
            type: 'mysql' as const,
            host: configService.get<string>('DB_HOST') || 'localhost',
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities,
            synchronize: true, // use apenas em dev
            logging: true, // habilita logs do TypeORM para depuração
          };
          return config;
        } catch (error) {
          logger.error(`Erro ao configurar TypeORM: ${error.message}`, error.stack);
          throw error;
        }
      },
    }),
    TypeOrmModule.forFeature([PlanoEntity, ClienteEntity]),
    ClientsModule.registerAsync([
      {
        name: 'PLANOS_ATIVOS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const logger = new Logger('ClientsModule');
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672';
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUri],
              queue: 'planos_ativos_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
      {
        name: 'GESTAO_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672';
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUri],
              queue: 'gestao_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
    PlanoModule,
    ClienteModule,
  ],
  controllers: [PlanoMessagingController, CobrancaMessagingController, PlanoAtivoMessagingController, RelatorioController],
  providers: [
    AtualizarStatusPlanoUseCase,
    {
      provide: CLIENTE_REPOSITORY,
      useClass: ClienteRepositoryMySQL,
    },
    {
      provide: PLANO_REPOSITORY,
      useClass: PlanoRepositoryMySQL,
    },
    GerarRelatorioClientesUseCase,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);
  constructor() {
    this.logger.log('AppModule inicializado com controladores PlanoMessagingController, CobrancaMessagingController, PlanoAtivoMessagingController e RelatorioController para gestao_queue');
  }
}