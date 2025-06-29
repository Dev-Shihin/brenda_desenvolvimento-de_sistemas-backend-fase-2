import { Injectable, Inject } from '@nestjs/common';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';

@Injectable()
export class DeletarPlanoUseCase {
  constructor(@Inject(PLANO_REPOSITORY) private readonly repository: IPlanoRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}