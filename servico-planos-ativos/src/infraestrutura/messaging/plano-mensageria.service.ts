import { Injectable, Inject, Logger } from '@nestjs/common'; 
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PlanoMensageriaService {
  private readonly logger = new Logger(PlanoMensageriaService.name);

  constructor(@Inject('PLANOS_ATIVOS_SERVICE') private client: ClientProxy) {}

  async notifyPlanoAtivado(data: { id: string; clienteId: number; planoId: number }) {
    this.logger.log(`Emitindo evento plano.ativado com dados: ${JSON.stringify(data)}`);
    this.client.emit('plano.ativado', data);
  }

  async notifyPlanoDesativado(data: { id: string; clienteId: number; planoId: number }) {
    this.logger.log(`Emitindo evento plano.desativado com dados: ${JSON.stringify(data)}`);
    this.client.emit('plano.desativado', data);
  }
}