import { Injectable, Inject } from '@nestjs/common';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';

@Injectable()
export class BuscarPlanoUseCase {
  constructor(@Inject(PLANO_REPOSITORY) private readonly repository: IPlanoRepository) {}

  async execute(id: number): Promise<Plano | null> {
    return await this.repository.findById(id);
  }
}