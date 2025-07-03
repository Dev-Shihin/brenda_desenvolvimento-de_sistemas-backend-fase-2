import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3001);
  logger.log('Serviço Faturamento iniciado na porta 3001');
}

bootstrap().catch((err) => {
  logger.error('Erro ao iniciar o serviço:', err.stack);
  process.exit(1);
});