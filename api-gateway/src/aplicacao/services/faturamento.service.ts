import { Injectable } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';

@Injectable()
export class FaturamentoService {
  constructor(private proxyService: ProxyService) {}

  async criarCobranca(data: { cobrancaId: number; clienteId: number; valor: number; status: string; dataVencimento: string }) {
    const response = await this.proxyService.callFaturamento('POST', 'cobrancas', data);
    return response;
  }
}