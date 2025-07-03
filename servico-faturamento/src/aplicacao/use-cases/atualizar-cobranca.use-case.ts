import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICobrancaRepository } from '../../dominio/interfaces/cobranca.repository.interface';
import { UpdateCobrancaDto } from '../dtos/cobranca.dto';
import { Cobranca } from '../../dominio/entities/cobranca.entity';
import { GestaoMensageriaService } from '../../infraestrutura/messaging/gestao.mensageria.service';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Injectable()
export class AtualizarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
    private readonly gestaoMensageriaService: GestaoMensageriaService,
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

    await this.gestaoMensageriaService.notifyCobrancaUpdated({
      id: cobranca.id,
      cobrancaId: cobranca.cobrancaId,
      clienteId: cobranca.clienteId,
      status: cobranca.status,
    });

    return cobranca;
  }
}