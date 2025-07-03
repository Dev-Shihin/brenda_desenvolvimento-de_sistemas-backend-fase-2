import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';

@Injectable()
export class ListarClientesUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return await this.repository.findAll();
  }
}