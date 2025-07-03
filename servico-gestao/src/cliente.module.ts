import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClienteController } from './interfaces/controllers/cliente.controller';
import { CriarClienteUseCase } from './aplicacao/use-cases/criar-cliente.use-case';
import { BuscarClienteUseCase } from './aplicacao/use-cases/buscar-cliente.use-case';
import { AtualizarClienteUseCase } from './aplicacao/use-cases/atualizar-cliente.use-case';
import { ListarClientesUseCase } from './aplicacao/use-cases/listar-clientes.use-case';
import { DeletarClienteUseCase } from './aplicacao/use-cases/deletar-cliente.use-case';
import { AssociarPlanoClienteUseCase } from './aplicacao/use-cases/associar-plano-cliente.use-case';
import { AtualizarStatusPlanoUseCase } from './aplicacao/use-cases/atualizar-status-plano.use-case';
import { CLIENTE_REPOSITORY } from './dominio/cliente.repository.interface';
import { ClienteRepositoryMySQL } from './infraestrutura/repositories/cliente.repository.mysql';
import { ClienteEntity } from './dominio/cliente.entity.typeorm';
import { GestaoMensageriaService } from './infraestrutura/messaging/gestao.mensageria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteEntity]),
    ClientsModule.registerAsync([
      {
        name: 'GESTAO_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
         
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672';
         
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUri],
              queue: 'gestao_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [ClienteController],
  providers: [
    CriarClienteUseCase,
    BuscarClienteUseCase,
    AtualizarClienteUseCase,
    ListarClientesUseCase,
    DeletarClienteUseCase,
    AssociarPlanoClienteUseCase,
    AtualizarStatusPlanoUseCase,
    {
      provide: CLIENTE_REPOSITORY,
      useClass: ClienteRepositoryMySQL,
    },
    {
      provide: 'GESTAO_MENSAGERIA_SERVICE',
      useClass: GestaoMensageriaService,
    },
  ],
  exports: [CLIENTE_REPOSITORY, 'GESTAO_MENSAGERIA_SERVICE'],
})
export class ClienteModule {}