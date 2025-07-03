import { Injectable, Inject } from '@nestjs/common';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';

@Injectable()
export class AtualizarPlanoUseCase {
  constructor(@Inject(PLANO_REPOSITORY) private readonly repository: IPlanoRepository) {}

  async execute(plano: Plano): Promise<void> {
    const existingPlano = await this.repository.findById(plano.getId());
    if (!existingPlano) {
      throw new Error('Plano não encontrado');
    }
    await this.repository.save(plano); 
  }
}