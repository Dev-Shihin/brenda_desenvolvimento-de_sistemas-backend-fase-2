import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(4000, () => {
    console.log('API Gateway rodando na porta 4000');
  });
}
bootstrap();