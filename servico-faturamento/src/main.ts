import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672'],
      queue: 'faturamento_queue',
      queueOptions: {
        durable: true,
      },
      reconnect: true,
      reconnectTime: 1000, 
    },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Serviço Faturamento API')
    .setDescription('API para gerenciamento de cobranças')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap().catch((err) => {
  logger.error('Erro ao iniciar o serviço:', err.stack);
  process.exit(1);
});