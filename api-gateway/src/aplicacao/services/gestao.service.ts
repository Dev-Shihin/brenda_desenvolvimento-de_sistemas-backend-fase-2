import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';

@Injectable()
export class GestaoService {
  constructor(private proxyService: ProxyService) {}

  async criarCliente(data: { id: number; nome: string; planoId: number }) {
    const response = await this.proxyService.callGestao('POST', 'clientes', data);
    return response;
  }
}