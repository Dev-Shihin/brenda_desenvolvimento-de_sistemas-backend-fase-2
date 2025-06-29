import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICobrancaRepository } from 'src/dominio/interfaces/cobranca.repository.interface';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Injectable()
export class DeletarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
  ) {}

  async execute(cobrancaId: string): Promise<void> {
    const cobranca = await this.cobrancaRepository.findById(cobrancaId);
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${cobrancaId} não encontrada`);
    }
    await this.cobrancaRepository.delete(cobrancaId);
  }
}