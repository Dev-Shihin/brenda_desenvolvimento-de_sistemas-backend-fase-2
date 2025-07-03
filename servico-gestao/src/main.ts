import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672'],
      queue: 'gestao_queue',
      queueOptions: {
        durable: true,
      },
      noAck: true,
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
  logger.log('Serviço Gestao rodando na porta 3000');
}
bootstrap().catch((err) => {
  logger.error('Erro ao iniciar o serviço:', err.stack);
  process.exit(1);
});