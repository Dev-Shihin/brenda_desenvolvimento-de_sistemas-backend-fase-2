import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';
import { RabbitmqService } from '../../infraestrutura/messaging/rabbitmq.service';

@Injectable()
export class FaturamentoService {
  constructor(
    private proxyService: ProxyService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async criarCobranca(data: { cobrancaId: number; clienteId: number; valor: number; status: string; dataVencimento: string }) {
    try {
      const response = await this.rabbitmqService.send('faturamento.criar_cobranca', data);
      return response;
    } catch (rabbitError) {
      console.error('Falha no RabbitMQ, usando fallback HTTP:', rabbitError.message);
      const httpResponse = await this.proxyService.callFaturamento('cobrancas', data);
      return httpResponse.data;
    }
  }
}