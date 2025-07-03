import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';
import { PlanoEntity } from '../../dominio/plano.entity.typeorm';

@Injectable()
export class PlanoRepositoryMySQL implements IPlanoRepository {
  constructor(
    @InjectRepository(PlanoEntity)
    private readonly planoRepository: Repository<PlanoEntity>,
  ) {}

  async findById(id: number): Promise<Plano | null> {
    const planoEntity = await this.planoRepository.findOne({ where: { id } });
    if (planoEntity) {
      return new Plano(planoEntity.id, planoEntity.nome, planoEntity.valor);
    }
    return null;
  }

  async findAll(): Promise<Plano[]> {
    const planoEntities = await this.planoRepository.find();
    return planoEntities.map(entity => new Plano(entity.id, entity.nome, entity.valor));
  }

  async save(plano: Plano): Promise<void> {
    const planoEntity = this.planoRepository.create({
      id: plano.getId(),
      nome: plano.getNome(),
      valor: plano.getValor(),
    });
    await this.planoRepository.save(planoEntity);
  }

  async delete(id: number): Promise<void> {
    await this.planoRepository.delete(id);
  }
}