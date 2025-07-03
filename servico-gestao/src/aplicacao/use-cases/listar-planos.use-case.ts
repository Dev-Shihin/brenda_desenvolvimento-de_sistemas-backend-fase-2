import { Injectable, Inject } from '@nestjs/common';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';

@Injectable()
export class ListarPlanosUseCase {
  constructor(@Inject(PLANO_REPOSITORY) private readonly repository: IPlanoRepository) {}

  async execute(): Promise<Plano[]> {
    return await this.repository.findAll();
  }
}