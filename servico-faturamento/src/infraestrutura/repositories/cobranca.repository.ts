import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cobranca } from '../../dominio/entities/cobranca.entity';
import { ICobrancaRepository } from '../../dominio/interfaces/cobranca.repository.interface';

@Injectable()
export class CobrancaRepository implements ICobrancaRepository {
  constructor(
    @InjectRepository(Cobranca)
    private readonly cobrancaRepository: Repository<Cobranca>,
  ) {}

  async create(cobranca: Cobranca): Promise<Cobranca> {
    return this.cobrancaRepository.save(cobranca);
  }

  async findById(id: string): Promise<Cobranca | null> {
    return this.cobrancaRepository.findOne({ where: { id } });
  }

  async findByClienteId(clienteId: number): Promise<Cobranca[]> {
    return this.cobrancaRepository.find({ where: { clienteId } });
  }

  async update(id: string, cobranca: Partial<Cobranca>): Promise<Cobranca | null> {
    await this.cobrancaRepository.update({ id }, cobranca);
    return this.cobrancaRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.cobrancaRepository.delete({ id });
  }
}