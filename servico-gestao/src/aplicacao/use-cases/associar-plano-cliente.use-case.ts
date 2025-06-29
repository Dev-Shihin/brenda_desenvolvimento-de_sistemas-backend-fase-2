import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';

@Injectable()
export class AssociarPlanoClienteUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository) {}

  async execute(clienteId: number, planoId: number): Promise<void> {
    const cliente = await this.repository.findById(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    cliente.setPlanoId(planoId); 
    await this.repository.save(cliente);
  }
}