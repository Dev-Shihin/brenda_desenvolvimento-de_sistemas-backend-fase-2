import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './interfaces/controllers/cliente.controller';
import { CriarClienteUseCase } from './aplicacao/use-cases/criar-cliente.use-case';
import { BuscarClienteUseCase } from './aplicacao/use-cases/buscar-cliente.use-case';
import { AtualizarClienteUseCase } from './aplicacao/use-cases/atualizar-cliente.use-case';
import { ListarClientesUseCase } from './aplicacao/use-cases/listar-clientes.use-case';
import { DeletarClienteUseCase } from './aplicacao/use-cases/deletar-cliente.use-case';
import { AssociarPlanoClienteUseCase } from './aplicacao/use-cases/associar-plano-cliente.use-case';
import { CLIENTE_REPOSITORY } from './dominio/cliente.repository.interface';
import { ClienteRepositoryMySQL } from './infraestrutura/repositories/cliente.repository.mysql';
import { ClienteEntity } from './dominio/cliente.entity.typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteEntity]),
  ],
  controllers: [ClienteController],
  providers: [
    CriarClienteUseCase,
    BuscarClienteUseCase,
    AtualizarClienteUseCase,
    ListarClientesUseCase,
    DeletarClienteUseCase,
    AssociarPlanoClienteUseCase,
    {
      provide: CLIENTE_REPOSITORY,
      useClass: ClienteRepositoryMySQL,
    },
  ],
  exports: [CLIENTE_REPOSITORY], 
})
export class ClienteModule {}