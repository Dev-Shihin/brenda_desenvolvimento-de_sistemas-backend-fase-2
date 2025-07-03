import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanoAtivo } from '../../dominio/entities/plano-ativo.entity';

@Injectable()
export class PlanoAtivoRepository {
  constructor(
    @InjectRepository(PlanoAtivo)
    private readonly repository: Repository<PlanoAtivo>,
  ) {}

  async save(planoAtivo: PlanoAtivo): Promise<PlanoAtivo> {
    return await this.repository.save(planoAtivo);
  }

  async findByClienteId(clienteId: number): Promise<PlanoAtivo[]> {
    return await this.repository.find({ where: { clienteId, ativo: true } });
  }

  async findById(id: string): Promise<PlanoAtivo | null> {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}