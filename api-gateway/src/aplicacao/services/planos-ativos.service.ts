import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';
import { RabbitmqService } from '../../infraestrutura/messaging/rabbitmq.service';

@Injectable()
export class PlanosAtivosService {
  constructor(
    private proxyService: ProxyService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async ativarPlano(data: { clienteId: number; planoId: number; nomePlano: string; valor: number; dataAtivacao: string }) {
    try {
      const response = await this.rabbitmqService.send('planos_ativos.ativar_plano', data);
      return response;
    } catch (rabbitError) {
      console.error('Falha no RabbitMQ, usando fallback HTTP:', rabbitError.message);
      const httpResponse = await this.proxyService.callPlanosAtivos('planos-ativos', data);
      return httpResponse.data;
    }
  }
}