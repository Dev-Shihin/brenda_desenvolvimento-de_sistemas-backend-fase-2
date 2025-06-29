import { Injectable } from '@nestjs/common';
import { PlanoAtivoRepository } from '../../infraestrutura/repositories/plano-ativo.repository';
import { PlanoAtivo } from '../../dominio/entities/plano-ativo.entity';
import { PlanoMensageriaService } from '../../infraestrutura/messaging/plano-mensageria.service';
import { CriarPlanoAtivoDto } from 'src/aplicacao/dtos/create-plano-ativo.dto';

@Injectable()
export class CriarPlanoAtivoUseCase {
  constructor(
    private readonly planoAtivoRepository: PlanoAtivoRepository,
    private readonly planoMensageriaService: PlanoMensageriaService,
  ) {}

  async execute(createPlanoData: CriarPlanoAtivoDto): Promise<PlanoAtivo> {
    const planoAtivo = new PlanoAtivo();
    Object.assign(planoAtivo, {
      clienteId: createPlanoData.clienteId,
      planoId: createPlanoData.planoId,
      nomePlano: createPlanoData.nomePlano,
      valor: createPlanoData.valor,
      ativo: createPlanoData.ativo,
      dataAtivacao: createPlanoData.dataAtivacao,
    });
    const savedPlanoAtivo = await this.planoAtivoRepository.save(planoAtivo);
    await this.planoMensageriaService.notifyPlanoAtivado({
      id: savedPlanoAtivo.id, 
      clienteId: savedPlanoAtivo.clienteId,
      planoId: savedPlanoAtivo.planoId,
    });
    return savedPlanoAtivo;
  }
}