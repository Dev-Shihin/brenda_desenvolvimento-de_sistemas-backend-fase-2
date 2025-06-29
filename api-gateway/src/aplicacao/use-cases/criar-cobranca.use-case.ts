import { Injectable } from '@nestjs/common';
import { FaturamentoService } from '../services/faturamento.service';
import { CriarCobrancaDto } from '../dto/criar-cobranca.dto';
import { RabbitmqService } from '../../infraestrutura/messaging/rabbitmq.service';

@Injectable()
export class CriarCobrancaUseCase {
  constructor(
    private faturamentoService: FaturamentoService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async execute(data: CriarCobrancaDto) {
    try {
      const response = await this.faturamentoService.criarCobranca(data);
      await this.rabbitmqService.emit('cobranca_criada', {
        cobrancaId: data.cobrancaId,
        clienteId: data.clienteId,
        valor: data.valor,
        status: data.status,
        dataVencimento: data.dataVencimento,
        timestamp: new Date().toISOString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Falha ao criar cobrança: ${error.message}`);
    }
  }
}