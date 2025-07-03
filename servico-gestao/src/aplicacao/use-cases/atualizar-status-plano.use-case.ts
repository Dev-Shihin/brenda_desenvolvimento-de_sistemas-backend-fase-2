import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { GestaoMensageriaService } from '../../infraestrutura/messaging/gestao.mensageria.service';

@Injectable()
export class AtualizarStatusPlanoUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository,
    @Inject('GESTAO_MENSAGERIA_SERVICE') private readonly mensageriaService: GestaoMensageriaService,
  ) {}

  async execute(clienteId: number, statusPlano: string): Promise<void> {
    const cliente = await this.repository.findById(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    cliente.setStatusPlano(statusPlano);
    await this.repository.save(cliente);

    await this.mensageriaService.notificarAlteracaoPlano(
      clienteId,
      cliente.getPlanoId(),
      statusPlano,
    );
  }
}