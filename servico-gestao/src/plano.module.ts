import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoController } from './interfaces/controllers/plano.controller';
import { CriarPlanoUseCase } from './aplicacao/use-cases/criar-plano.use-case';
import { BuscarPlanoUseCase } from './aplicacao/use-cases/buscar-plano.use-case';
import { ListarPlanosUseCase } from './aplicacao/use-cases/listar-planos.use-case';
import { DeletarPlanoUseCase } from './aplicacao/use-cases/deletar-plano.use-case';
import { AtualizarPlanoUseCase } from './aplicacao/use-cases/atualizar-plano.use-case';
import { PLANO_REPOSITORY } from './dominio/plano.repository.interface';
import { PlanoRepositoryMySQL } from './infraestrutura/repositories/plano.repository.mysql';
import { PlanoEntity } from './dominio/plano.entity.typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanoEntity]),
  ],
  controllers: [PlanoController],
  providers: [
    CriarPlanoUseCase,
    BuscarPlanoUseCase,
    ListarPlanosUseCase,
    DeletarPlanoUseCase,
    AtualizarPlanoUseCase,
    {
      provide: PLANO_REPOSITORY,
      useClass: PlanoRepositoryMySQL,
    },
  ],
})
export class PlanoModule {}