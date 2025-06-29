import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CobrancaModule } from './cobranca.module';
import { Cobranca } from './dominio/entities/cobranca.entity';

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
          entities: [Cobranca],
          synchronize: true, // Usar apenas em desenvolvimento
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'FATURAMENTO_SERVICE',
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
              queue: 'faturamento_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    CobrancaModule,
  ],
})
export class AppModule {}