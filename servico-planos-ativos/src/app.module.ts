import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PlanoAtivosModule } from './plano-ativo.module';
import { PlanoAtivo } from './dominio/entities/plano-ativo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongodbUri = configService.get<string>('MONGODB_URI');
        if (!mongodbUri) {
          throw new Error('MONGODB_URI não está definido no arquivo .env');
        }
        return {
          type: 'mongodb',
          url: mongodbUri,
          entities: [PlanoAtivo], 
          synchronize: true, 
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'PLANOS_ATIVOS_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI');
          if (!rabbitMqUri) {
            throw new Error('RABBITMQ_URI não está definido no arquivo .env');
          }
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
        inject: [ConfigService],
      },
    ]),
    PlanoAtivosModule,
  ],
})
export class AppModule {}