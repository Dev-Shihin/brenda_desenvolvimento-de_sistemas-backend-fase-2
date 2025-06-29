import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cobranca } from './dominio/entities/cobranca.entity';
import { CobrancaRepository } from './infraestrutura/repositories/cobranca.repository';
import { CriarCobrancaUseCase } from './aplicacao/use-cases/criar-cobranca.use-case';
import { BuscarCobrancaUseCase } from './aplicacao/use-cases/buscar-cobranca.use-case';
import { AtualizarCobrancaUseCase } from './aplicacao/use-cases/atualizar-cobranca.use-case';
import { DeletarCobrancaUseCase } from './aplicacao/use-cases/deletar-cobranca.use-case';
import { GestaoMensageriaService } from './infraestrutura/messaging/gestao.mensageria.service';
import { CobrancaController } from './interfaces/controllers/cobranca.controller';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cobranca]),
    ConfigModule, 
    ClientsModule.registerAsync([
      {
        name: 'FATURAMENTO_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI');
          if (!rabbitMqUri) {
            throw new Error('RABBITMQ_URI não está definido no arquivo .env');
          }
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUri],
              queue: 'faturamento_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CobrancaController],
  providers: [
    CriarCobrancaUseCase,
    BuscarCobrancaUseCase,
    AtualizarCobrancaUseCase,
    DeletarCobrancaUseCase,
    GestaoMensageriaService,
    {
      provide: COBRANCA_REPOSITORY,
      useClass: CobrancaRepository,
    },
  ],
  exports: [COBRANCA_REPOSITORY],
})
export class CobrancaModule {}
