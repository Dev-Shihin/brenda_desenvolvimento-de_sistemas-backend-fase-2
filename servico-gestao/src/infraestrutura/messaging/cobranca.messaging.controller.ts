import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class CobrancaMessagingController {
  private readonly logger = new Logger(CobrancaMessagingController.name);

  constructor() {
    this.logger.log('CobrancaMessagingController inicializado para gestao_queue');
  }

  @EventPattern('cobranca.created')
  async handleCobrancaCreated(data: any) {
    this.logger.log(`Evento cobranca.created recebido na fila gestao_queue: ${JSON.stringify(data)}`);
  }

  @EventPattern('cobranca.updated')
  async handleCobrancaUpdated(data: any) {
    this.logger.log(`Evento cobranca.updated recebido na fila gestao_queue: ${JSON.stringify(data)}`);
  }

  @EventPattern('cobranca.deleted')
  async handleCobrancaDeleted(data: any) {
    this.logger.log(`Evento cobranca.deleted recebido na fila gestao_queue: ${JSON.stringify(data)}`);
  }
}