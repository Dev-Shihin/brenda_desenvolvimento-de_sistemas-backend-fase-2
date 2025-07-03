import { Injectable } from '@nestjs/common';
import { PlanoAtivoRepository } from '../../infraestrutura/repositories/plano-ativo.repository';
import { PlanoAtivo } from '../../dominio/entities/plano-ativo.entity';

@Injectable()
export class ConsultarPlanoAtivoUseCase {
  constructor(private readonly planoAtivoRepository: PlanoAtivoRepository) {}

  async execute(clienteId: number): Promise<PlanoAtivo[]> {
    return this.planoAtivoRepository.findByClienteId(clienteId);
  }
}