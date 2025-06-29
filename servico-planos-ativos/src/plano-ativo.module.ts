import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlanoAtivo } from './dominio/entities/plano-ativo.entity';
import { PlanoAtivoRepository } from './infraestrutura/repositories/plano-ativo.repository';
import { PlanoMensageriaService } from './infraestrutura/messaging/plano-mensageria.service';
import { CriarPlanoAtivoUseCase } from './aplicacao/use-cases/criar-plano-ativo.use-case';
import { ConsultarPlanoAtivoUseCase } from './aplicacao/use-cases/consultar-plano-ativo.use-case';
import { DesativarPlanoAtivoUseCase } from './aplicacao/use-cases/desativar-plano-ativo.use-case';
import { PlanoAtivoController } from './interfaces/controllers/plano-ativo.controller';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { typeormConfig } from './infraestrutura/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    TypeOrmModule.forFeature([PlanoAtivo]),
    ClientsModule.register([
      {
        name: 'PLANOS_ATIVOS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672'],
          queue: 'planos_ativos_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [PlanoAtivoController],
  providers: [
    PlanoAtivoRepository,
    PlanoMensageriaService,
    CriarPlanoAtivoUseCase,
    ConsultarPlanoAtivoUseCase,
    DesativarPlanoAtivoUseCase,
  ],
  exports: [PlanoAtivoRepository, PlanoMensageriaService],
})
export class PlanoAtivosModule {}