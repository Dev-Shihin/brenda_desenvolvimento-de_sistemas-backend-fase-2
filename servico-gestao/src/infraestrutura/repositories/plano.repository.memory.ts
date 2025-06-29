import { Injectable } from '@nestjs/common';
import { IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';

@Injectable()
export class PlanoRepositoryMemory implements IPlanoRepository {
  private planos: Plano[] = [];

  async findById(id: number): Promise<Plano | null> {
    const plano = this.planos.find((p) => p.getId() === id);
    return plano || null;
  }

  async save(plano: Plano): Promise<void> {
    const existingIndex = this.planos.findIndex((p) => p.getId() === plano.getId());
    if (existingIndex >= 0) {
      this.planos[existingIndex] = plano;
    } else {
      this.planos.push(plano);
    }
  }

  async delete(id: number): Promise<void> {
    this.planos = this.planos.filter((p) => p.getId() !== id);
  }

  async findAll(): Promise<Plano[]> {
    return [...this.planos]; 
  }
}