import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanoAtivoRepository } from '../../infraestrutura/repositories/plano-ativo.repository';
import { PlanoMensageriaService } from '../../infraestrutura/messaging/plano-mensageria.service';

@Injectable()
export class DesativarPlanoAtivoUseCase {
  constructor(
    private readonly planoAtivoRepository: PlanoAtivoRepository,
    private readonly planoMensageriaService: PlanoMensageriaService,
  ) {}

  async execute(id: string): Promise<void> {
    const planoAtivo = await this.planoAtivoRepository.findById(id);
    if (!planoAtivo) {
      throw new NotFoundException(`Plano ativo com ID ${id} não encontrado`);
    }

    planoAtivo.ativo = false;
    await this.planoAtivoRepository.save(planoAtivo);

    await this.planoMensageriaService.notifyPlanoDesativado({
      id: planoAtivo.id,
      clienteId: planoAtivo.clienteId,
      planoId: planoAtivo.planoId,
    });
  }
}