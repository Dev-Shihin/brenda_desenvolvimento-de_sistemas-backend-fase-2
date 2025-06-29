import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GestaoMensageriaService {
  constructor(@Inject('FATURAMENTO_SERVICE') private client: ClientProxy) {}

  async notifyCobrancaCreated(cobrancaData: any) {
    await lastValueFrom(
      this.client.emit('cobranca.created', cobrancaData),
    );
  }

  async notifyCobrancaUpdated(cobrancaData: any) {
    await lastValueFrom(
      this.client.emit('cobranca.updated', cobrancaData),
    );
  }

  async notifyCobrancaDeleted(cobrancaId: string) {
    await lastValueFrom(
      this.client.emit('cobranca.deleted', { id: cobrancaId }),
    );
  }
}