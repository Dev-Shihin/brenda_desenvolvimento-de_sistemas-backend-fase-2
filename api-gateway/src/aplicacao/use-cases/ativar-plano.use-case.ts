import { Injectable } from '@nestjs/common';
import { PlanosAtivosService } from '../services/planos-ativos.service';
import { AtivarPlanoDto } from '../dto/ativar-plano.dto';
import { RabbitmqService } from '../../infraestrutura/messaging/rabbitmq.service';

@Injectable()
export class AtivarPlanoUseCase {
  constructor(
    private planosAtivosService: PlanosAtivosService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async execute(data: AtivarPlanoDto) {
    try {
      const response = await this.planosAtivosService.ativarPlano(data);
      await this.rabbitmqService.emit('plano_ativado', {
        clienteId: data.clienteId,
        planoId: data.planoId,
        nomePlano: data.nomePlano,
        valor: data.valor,
        dataAtivacao: data.dataAtivacao,
        timestamp: new Date().toISOString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Falha ao ativar plano: ${error.message}`);
    }
  }
}