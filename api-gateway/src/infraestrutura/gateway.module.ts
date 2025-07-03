import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices'; 
import { ProxyService } from './http/proxy.service';
import { ConsumerController } from './messaging/consumer.controller';
import { RabbitmqService } from './messaging/rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672'],
            queue: 'api_gateway_queue',
            queueOptions: {
              durable: true,
            },
            noAck: false,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ProxyService, RabbitmqService, ConsumerController],
  exports: [ProxyService, RabbitmqService],
})
export class GatewayModule {}