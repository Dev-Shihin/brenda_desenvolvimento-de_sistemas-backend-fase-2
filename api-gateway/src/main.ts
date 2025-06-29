import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); 
  app.useGlobalPipes(new ValidationPipe()); 

  try {
    await app.listen(4000, () => {
      console.log('API Gateway rodando na porta 4000');
    });
  } catch (error) {
    console.error('Falha ao iniciar a aplicação:', error.message);
    process.exit(1);
  }
}
bootstrap();