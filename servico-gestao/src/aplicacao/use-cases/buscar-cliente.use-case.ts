import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';

@Injectable()
export class BuscarClienteUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository) {}

  async execute(id: number): Promise<Cliente | null> {
    return await this.repository.findById(id);
  }
}