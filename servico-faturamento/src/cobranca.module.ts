import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Cobranca } from './dominio/entities/cobranca.entity';
import { CobrancaRepository } from './infraestrutura/repositories/cobranca.repository';
import { CriarCobrancaUseCase } from './aplicacao/use-cases/criar-cobranca.use-case';
import { BuscarCobrancaUseCase } from './aplicacao/use-cases/buscar-cobranca.use-case';
import { AtualizarCobrancaUseCase } from './aplicacao/use-cases/atualizar-cobranca.use-case';
import { DeletarCobrancaUseCase } from './aplicacao/use-cases/deletar-cobranca.use-case';
import { GestaoMensageriaService } from './infraestrutura/messaging/gestao.mensageria.service';
import { CobrancaController } from './interfaces/controllers/cobranca.controller';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cobranca]),
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'GESTAO_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672';
          const logger = new Logger('ClientsModule');
          logger.log(`Configurando RabbitMQ com URI: ${rabbitMqUri}, fila: gestao_queue para RPC e eventos`);
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUri],
              queue: 'gestao_queue',
              queueOptions: { durable: true },
              noAck: true, // Evita conflitos com confirmações manuais
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CobrancaController],
  providers: [
    CriarCobrancaUseCase,
    BuscarCobrancaUseCase,
    AtualizarCobrancaUseCase,
    DeletarCobrancaUseCase,
    GestaoMensageriaService,
    {
      provide: COBRANCA_REPOSITORY,
      useClass: CobrancaRepository,
    },
  ],
  exports: [COBRANCA_REPOSITORY],
})
export class CobrancaModule {
  private readonly logger = new Logger(CobrancaModule.name);
  constructor() {
    this.logger.log('CobrancaModule inicializado');
  }
}