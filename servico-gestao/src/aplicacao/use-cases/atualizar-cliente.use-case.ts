import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';
import { GestaoMensageriaService } from '../../infraestrutura/messaging/gestao.mensageria.service';

@Injectable()
export class AtualizarClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository,
    @Inject('GESTAO_MENSAGERIA_SERVICE') private readonly mensageriaService: GestaoMensageriaService,
  ) {}

  async update(cliente: Cliente): Promise<void> {
    const existingCliente = await this.repository.findById(cliente.getId());
    if (!existingCliente) {
      throw new Error('Cliente não encontrado');
    }

    const planoIdMudou = cliente.getPlanoId() !== existingCliente.getPlanoId();
    const statusPlanoMudou = cliente.getStatusPlano() !== existingCliente.getStatusPlano();

    await this.repository.save(cliente);

    if (planoIdMudou || statusPlanoMudou) {
      await this.mensageriaService.notificarAlteracaoPlano(
        cliente.getId(),
        cliente.getPlanoId(),
        cliente.getStatusPlano(),
      );
    }
  }
}