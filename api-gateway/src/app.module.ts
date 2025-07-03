import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './interfaces/controllers/gateway.controller';
import { ProxyService } from './infraestrutura/http/proxy.service';
import { CriarClienteUseCase } from './aplicacao/use-cases/criar-cliente.use-case';
import { AtivarPlanoUseCase } from './aplicacao/use-cases/ativar-plano.use-case';
import { CriarCobrancaUseCase } from './aplicacao/use-cases/criar-cobranca.use-case';
import { GestaoService } from './aplicacao/services/gestao.service';
import { PlanosAtivosService } from './aplicacao/services/planos-ativos.service';
import { FaturamentoService } from './aplicacao/services/faturamento.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqService } from './infraestrutura/messaging/rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'api_gateway_queue',
          queueOptions: {
            durable: true,
          },
          noAck: true,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [
    ProxyService,
    CriarClienteUseCase,
    AtivarPlanoUseCase,
    CriarCobrancaUseCase,
    GestaoService,
    PlanosAtivosService,
    FaturamentoService,
    RabbitmqService,
  ],
})
export class AppModule {}