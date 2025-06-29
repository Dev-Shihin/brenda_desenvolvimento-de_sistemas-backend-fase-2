import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './interfaces/controllers/gateway.controller';
import { ProxyService } from './infraestrutura/http/proxy.service';
import { HttpModule } from '@nestjs/axios';
import { CriarClienteUseCase } from './aplicacao/use-cases/criar-cliente.use-case';
import { AtivarPlanoUseCase } from './aplicacao/use-cases/ativar-plano.use-case';
import { CriarCobrancaUseCase } from './aplicacao/use-cases/criar-cobranca.use-case';
import { ValidationMiddleware } from './interfaces/middlewares/validation.middleware';
import { LoggingInterceptor } from './interfaces/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './interfaces/filters/http-exception.filter';
import { GestaoService } from './aplicacao/services/gestao.service';
import { PlanosAtivosService } from './aplicacao/services/planos-ativos.service';
import { FaturamentoService } from './aplicacao/services/faturamento.service';
import { AuthGuard } from './interfaces/guards/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqService } from './infraestrutura/messaging/rabbitmq.service';
import { ConsumerService } from './infraestrutura/messaging/consumer.service';
import { ProcessarNotificacaoJob } from './aplicacao/jobs/processar-notificacao.job';
import { ConsumerController } from './infraestrutura/messaging/consumer.controller';
import { HttpServiceCustom } from './infraestrutura/http/http-service-custom.service';

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
  controllers: [GatewayController, ConsumerController],
  providers: [
    ProxyService,
    CriarClienteUseCase,
    AtivarPlanoUseCase,
    CriarCobrancaUseCase,
    GestaoService,
    PlanosAtivosService,
    FaturamentoService,
    RabbitmqService,
    ConsumerService,
    ProcessarNotificacaoJob,
    HttpServiceCustom,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    AuthGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'api/clientes', method: RequestMethod.POST },
        { path: 'api/planos-ativos', method: RequestMethod.POST },
        { path: 'api/cobrancas', method: RequestMethod.POST },
      );
  }
}