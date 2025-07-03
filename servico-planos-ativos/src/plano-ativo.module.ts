import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlanoAtivo } from './dominio/entities/plano-ativo.entity';
import { PlanoAtivoRepository } from './infraestrutura/repositories/plano-ativo.repository';
import { ConsultarPlanoAtivoUseCase } from './aplicacao/use-cases/consultar-plano-ativo.use-case';
import { PlanoAtivoController } from './interfaces/controllers/plano-ativo.controller';
import { typeormConfig } from './infraestrutura/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    TypeOrmModule.forFeature([PlanoAtivo]),
  ],
  controllers: [PlanoAtivoController],
  providers: [
    PlanoAtivoRepository,
    ConsultarPlanoAtivoUseCase,
  ],
  exports: [PlanoAtivoRepository],
})
export class PlanoAtivosModule {}