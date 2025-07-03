import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';

@Injectable()
export class PlanosAtivosService {
  constructor(private proxyService: ProxyService) {}

  async ativarPlano(data: { id: string; clienteId: number; planoId: number; nomePlano: string; valor: number; dataAtivacao: string; timestamp: string }) {
    const response = await this.proxyService.callPlanosAtivos('POST', 'planos-ativos', data);
    return response;
  }
}