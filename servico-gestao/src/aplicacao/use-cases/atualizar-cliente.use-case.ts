import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';

@Injectable()
export class AtualizarClienteUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository) {}

  async execute(cliente: Cliente): Promise<void> {
    const existingCliente = await this.repository.findById(cliente.getId());
    if (!existingCliente) {
      throw new Error('Cliente não encontrado');
    }
    await this.repository.save(cliente); 
  }
}