import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICobrancaRepository } from 'src/dominio/interfaces/cobranca.repository.interface';
import { UpdateCobrancaDto } from '../dtos/cobranca.dto';
import { Cobranca } from 'src/dominio/entities/cobranca.entity';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Injectable()
export class AtualizarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
  ) {}

  async execute(cobrancaId: string, dto: UpdateCobrancaDto): Promise<Cobranca> {
    const cobranca = await this.cobrancaRepository.update(cobrancaId, {
      valor: dto.valor,
      status: dto.status,
      dataVencimento: dto.dataVencimento ? new Date(dto.dataVencimento) : undefined,
    });
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${cobrancaId} não encontrada`);
    }
    return cobranca;
  }
}