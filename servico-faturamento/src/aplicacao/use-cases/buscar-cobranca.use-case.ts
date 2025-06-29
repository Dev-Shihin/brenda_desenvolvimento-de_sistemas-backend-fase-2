import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICobrancaRepository } from 'src/dominio/interfaces/cobranca.repository.interface';
import { Cobranca } from 'src/dominio/entities/cobranca.entity';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Injectable()
export class BuscarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
  ) {}

  async execute(cobrancaId: string): Promise<Cobranca> {
    const cobranca = await this.cobrancaRepository.findById(cobrancaId);
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${cobrancaId} não encontrada`);
    }
    return cobranca;
  }

  async executeByClienteId(clienteId: number): Promise<Cobranca[]> {
    return this.cobrancaRepository.findByClienteId(clienteId);
  }
}