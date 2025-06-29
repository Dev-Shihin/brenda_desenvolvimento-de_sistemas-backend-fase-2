import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';

@Controller()
export class PlanoMessagingController {
  constructor(
    @Inject('CLIENTE_REPOSITORY') private clienteRepository: IClienteRepository,
  ) {}

  @EventPattern('plano.ativado')
  async handlePlanoAtivado(@Payload() data: { id: string; clienteId: number; planoId: number }) {
    console.log('Plano ativado recebido:', data);
    const cliente = await this.clienteRepository.findById(data.clienteId);
    if (cliente) {
      const updatedCliente = new Cliente(cliente.getId(), cliente.getNome(), data.planoId);
      await this.clienteRepository.save(updatedCliente);
      console.log(`Cliente ${data.clienteId} atualizado com planoId ${data.planoId}`);
    } else {
      console.log(`Cliente ${data.clienteId} não encontrado`);
    }
  }

  @EventPattern('plano.desativado')
  async handlePlanoDesativado(@Payload() data: { id: string }) {
    console.log('Plano desativado recebido:', data);

    const clientes = await this.clienteRepository.findByPlanoId(parseInt(data.id));
    for (const cliente of clientes) {
      
      const outrosClientes = await this.clienteRepository.findByPlanoId(cliente.getPlanoId());
      const isLastClientForPlano = outrosClientes.length === 1 && outrosClientes[0].getId() === cliente.getId();
      if (isLastClientForPlano) {
        const clienteInativo = new Cliente(cliente.getId(), cliente.getNome(), 0);
        await this.clienteRepository.save(clienteInativo);
        console.log(`Cliente ${cliente.getId()} marcado sem plano ativo (planoId 0)`);
      }
    }
  }
}