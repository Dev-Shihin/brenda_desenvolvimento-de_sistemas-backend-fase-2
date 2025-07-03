import { Controller, Logger, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IClienteRepository } from '../../dominio/cliente.repository.interface';
import { CLIENTE_REPOSITORY } from '../../dominio/cliente.repository.interface';

@Controller()
export class PlanoAtivoMessagingController {
  private readonly logger = new Logger(PlanoAtivoMessagingController.name);

  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {
    this.logger.log('PlanoAtivoMessagingController inicializado para planos_ativos_queue');
  }

  @EventPattern('plano.ativado')
  async handlePlanoAtivado(@Payload() data: { id: string; clienteId: number; planoId: number }) {
    this.logger.log(`Evento plano.ativado recebido na fila planos_ativos_queue: ${JSON.stringify(data)}`);
    const cliente = await this.clienteRepository.findById(data.clienteId);
    if (cliente) {
      await this.clienteRepository.updateStatusPlano(data.clienteId, 'ativo');
      this.logger.log(`Status do cliente ${data.clienteId} atualizado para ativo`);
    }
  }

  @EventPattern('plano.desativado')
  async handlePlanoDesativado(@Payload() data: { id: string; clienteId: number; planoId: number }) {
    this.logger.log(`Evento plano.desativado recebido na fila planos_ativos_queue: ${JSON.stringify(data)}`);
    const cliente = await this.clienteRepository.findById(data.clienteId);
    if (cliente) {
      await this.clienteRepository.updateStatusPlano(data.clienteId, 'inativo');
      this.logger.log(`Status do cliente ${data.clienteId} atualizado para inativo`);
    }
  }
}