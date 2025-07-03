import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class GestaoMensageriaService {
  private readonly logger = new Logger(GestaoMensageriaService.name);

  constructor(@Inject('GESTAO_SERVICE') private client: ClientProxy) {
    this.logger.log('GestaoMensageriaService inicializado com ClientProxy para gestao_queue');
  }

  async getPlanoById(planoId: number): Promise<{ id: number; nome: string; valor: number }> {
    this.logger.log(`Enviando solicitação RPC get_plano_by_id para plano ${planoId} na fila gestao_queue`);
    try {
      const plano = await lastValueFrom(
        this.client.send('get_plano_by_id', { id: planoId }).pipe(timeout(15000))
      );
      if (!plano || !plano.id || !plano.valor) {
        this.logger.error(`Plano ${planoId} não encontrado ou inválido`);
        throw new BadRequestException(`Plano ${planoId} não encontrado ou inválido`);
      }
      this.logger.log(`Plano ${planoId} recebido: ${JSON.stringify(plano)}`);
      return plano;
    } catch (error) {
      this.logger.error(`Erro ao consultar plano ${planoId}: ${error.message || 'Serviço indisponível'}`, error.stack);
      throw new BadRequestException(`Erro ao consultar plano ${planoId}: ${error.message || 'Serviço indisponível'}`);
    }
  }

  async notifyCobrancaCreated(cobrancaData: any) {
    this.logger.log(`Enviando evento cobranca.created para gestao_queue: ${JSON.stringify(cobrancaData)}`);
    try {
      this.client.emit('cobranca.created', cobrancaData);
      this.logger.log('Evento cobranca.created enviado com sucesso');
    } catch (error) {
      this.logger.error(`Erro ao enviar evento cobranca.created: ${error.message}`, error.stack);
      throw error;
    }
  }

  async notifyCobrancaUpdated(cobrancaData: any) {
    this.logger.log(`Enviando evento cobranca.updated para gestao_queue: ${JSON.stringify(cobrancaData)}`);
    try {
      this.client.emit('cobranca.updated', cobrancaData);
      this.logger.log('Evento cobranca.updated enviado com sucesso');
    } catch (error) {
      this.logger.error(`Erro ao enviar evento cobranca.updated: ${error.message}`, error.stack);
      throw error;
    }
  }

  async notifyCobrancaDeleted(data: { id: string; cobrancaId: number; clienteId: number }) {
    this.logger.log(`Enviando evento cobranca.deleted para gestao_queue: ${JSON.stringify(data)}`);
    try {
      this.client.emit('cobranca.deleted', data);
      this.logger.log('Evento cobranca.deleted enviado com sucesso');
    } catch (error) {
      this.logger.error(`Erro ao enviar evento cobranca.deleted: ${error.message}`, error.stack);
      throw error;
    }
  }
}