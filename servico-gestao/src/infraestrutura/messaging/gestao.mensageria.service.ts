import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IClienteRepository } from '../../dominio/cliente.repository.interface';

@Injectable()
export class GestaoMensageriaService {
  constructor(
    @Inject('GESTAO_SERVICE') private readonly client: ClientProxy,
    @Inject('CLIENTE_REPOSITORY') private readonly clienteRepository: IClienteRepository,
  ) {}

  async notificarAlteracaoPlano(clienteId: number, planoId: number, statusPlano: string): Promise<void> {
    const cliente = await this.clienteRepository.findById(clienteId);
    if (!cliente) {
      throw new Error(`Cliente ${clienteId} não encontrado`);
    }

    this.client.emit('cliente_plano_alterado', {
      clienteId,
      planoId,
      statusPlano,
      timestamp: new Date(),
    });
    console.log(`Evento cliente_plano_alterado enviado para cliente ${clienteId}`);
  }
}