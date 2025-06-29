import { Injectable } from '@nestjs/common';
import { GestaoService } from '../services/gestao.service';
import { CriarClienteDto } from '../dto/criar-cliente.dto';
import { RabbitmqService } from '../../infraestrutura/messaging/rabbitmq.service';

@Injectable()
export class CriarClienteUseCase {
  constructor(
    private gestaoService: GestaoService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async execute(data: CriarClienteDto) {
    try {
      const response = await this.gestaoService.criarCliente(data);
      await this.rabbitmqService.emit('cliente_criado', {
        clienteId: data.id,
        nome: data.nome,
        planoId: data.planoId,
        timestamp: new Date().toISOString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Falha ao criar cliente: ${error.message}`);
    }
  }
}