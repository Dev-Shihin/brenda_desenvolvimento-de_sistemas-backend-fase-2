import { Injectable, Inject } from '@nestjs/common';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';
import { GestaoMensageriaService } from '../../infraestrutura/messaging/gestao.mensageria.service';

@Injectable()
export class CriarClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY) private readonly repository: IClienteRepository,
    @Inject('GESTAO_MENSAGERIA_SERVICE') private readonly mensageriaService: GestaoMensageriaService,
  ) {}

  async execute(cliente: Cliente): Promise<void> {
    await this.repository.save(cliente);

    await this.mensageriaService.notificarAlteracaoPlano(
      cliente.getId(),
      cliente.getPlanoId(),
      cliente.getStatusPlano(),
    );
  }
}