import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common'; // Adicionado
import { IClienteRepository } from '../../dominio/cliente.repository.interface';

@Injectable()
export class GerarRelatorioClientesUseCase {
  constructor(
    @Inject('CLIENTE_REPOSITORY') private readonly clienteRepository: IClienteRepository // Ajustado para usar o token
  ) {}

  async execute(): Promise<{ [key: string]: number }> {
    const clientes = await this.clienteRepository.findAll();
    const relatorio = clientes.reduce((acc, cliente) => {
      const status = cliente.getStatusPlano();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    return relatorio;
  }
}