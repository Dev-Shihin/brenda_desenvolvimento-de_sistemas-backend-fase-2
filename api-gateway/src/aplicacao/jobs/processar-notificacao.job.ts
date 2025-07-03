import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';

@Injectable()
export class ProcessarNotificacaoJob {
  constructor(private proxyService: ProxyService) {}

  async processarPlanoAtivado(data: { id: string; clienteId: number; planoId: number; nomePlano: string; valor: number; dataAtivacao: string; timestamp: string }) {
    console.log(`Processando plano ativado: ${JSON.stringify(data)}`);
    await this.proxyService.callGestao('PUT', `clientes/${data.clienteId}/status-plano`, { statusPlano: 'ativo' });
  }

  async processarCobrancaCriada(data: { cobrancaId: number; clienteId: number; valor: number; status: string; dataVencimento: string; timestamp: string }) {
    console.log(`Processando cobrança criada: ${JSON.stringify(data)}`);
  }

  async processarPlanoDesativado(data: { id: string; clienteId: number; planoId: number; timestamp: string }) {
    console.log(`Processando plano desativado: ${JSON.stringify(data)}`);
    await this.proxyService.callGestao('PUT', `clientes/${data.clienteId}/status-plano`, { statusPlano: 'inativo' });
  }
}