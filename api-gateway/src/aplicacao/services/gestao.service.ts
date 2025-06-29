import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';
import { RabbitmqService } from '../../infraestrutura/messaging/rabbitmq.service';

@Injectable()
export class GestaoService {
  constructor(
    private proxyService: ProxyService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async criarCliente(data: { id: number; nome: string; planoId: number }) {
    try {
      const response = await this.rabbitmqService.send('gestao.criar_cliente', data);
      return response;
    } catch (rabbitError) {
      console.error('Falha no RabbitMQ, usando fallback HTTP:', rabbitError.message);
      const httpResponse = await this.proxyService.callGestao('clientes', data);
      return httpResponse.data;
    }
  }

  async buscarCliente(id: string) {
    try {
      const response = await this.rabbitmqService.send('gestao.buscar_cliente', { id });
      return response;
    } catch (rabbitError) {
      console.error('Falha no RabbitMQ, usando fallback HTTP:', rabbitError.message);
      const httpResponse = await this.proxyService.callGestao(`clientes/${id}`);
      return httpResponse.data;
    }
  }
}