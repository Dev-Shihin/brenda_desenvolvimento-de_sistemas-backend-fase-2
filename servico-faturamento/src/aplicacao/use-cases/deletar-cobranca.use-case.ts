import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICobrancaRepository } from '../../dominio/interfaces/cobranca.repository.interface';
import { GestaoMensageriaService } from '../../infraestrutura/messaging/gestao.mensageria.service';
import { COBRANCA_REPOSITORY } from './criar-cobranca.use-case';

@Injectable()
export class DeletarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
    private readonly gestaoMensageriaService: GestaoMensageriaService,
  ) {}

  async execute(id: string): Promise<void> {
    const cobranca = await this.cobrancaRepository.findById(id);
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${id} não encontrada`);
    }

    await this.cobrancaRepository.delete(id);
    await this.gestaoMensageriaService.notifyCobrancaDeleted({
      id,
      cobrancaId: cobranca.cobrancaId,
      clienteId: cobranca.clienteId,
    });
  }
}