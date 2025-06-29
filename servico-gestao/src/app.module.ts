import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanoModule } from './plano.module';
import { ClienteModule } from './cliente.module';
import { GestaoMensageriaService } from './infraestrutura/messaging/gestao.mensageria.service';
import { CobrancaMessagingController } from './infraestrutura/messaging/cobranca.messaging.controller';
import { PlanoMessagingController } from './infraestrutura/messaging/plano.messaging.controller';
import { PlanoEntity } from './dominio/plano.entity.typeorm';
import { ClienteEntity } from './dominio/cliente.entity.typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USERNAME') || 'root',
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME') || 'servico_gestao',
        entities: [PlanoEntity, ClienteEntity],
        synchronize: true, // use apenas em dev
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'GESTAO_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672',
            ],
            queue: 'faturamento_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
      {
        name: 'PLANOS_ATIVOS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672',
            ],
            queue: 'planos_ativos_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    TypeOrmModule.forFeature([PlanoEntity, ClienteEntity]),
    PlanoModule,
    ClienteModule, 
  ],
  controllers: [CobrancaMessagingController, PlanoMessagingController],
  providers: [
    GestaoMensageriaService,
  ],
})
export class AppModule {}