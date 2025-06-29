import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../dominio/cliente.repository.interface';
import { Cliente } from '../../dominio/cliente.entity';
import { ClienteEntity } from '../../dominio/cliente.entity.typeorm';

@Injectable()
export class ClienteRepositoryMySQL implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async findById(id: number): Promise<Cliente | null> {
    const clienteEntity = await this.clienteRepository.findOne({ where: { id } });
    if (clienteEntity) {
      return new Cliente(clienteEntity.id, clienteEntity.nome, clienteEntity.planoId);
    }
    return null;
  }

  async findByPlanoId(planoId: number): Promise<Cliente[]> {
    const clienteEntities = await this.clienteRepository.find({ where: { planoId } });
    return clienteEntities.map(entity => new Cliente(entity.id, entity.nome, entity.planoId));
  }

  async findAll(): Promise<Cliente[]> {
    const clienteEntities = await this.clienteRepository.find();
    return clienteEntities.map(entity => new Cliente(entity.id, entity.nome, entity.planoId));
  }

  async save(cliente: Cliente): Promise<void> {
    const clienteEntity = this.clienteRepository.create({
      id: cliente.getId(),
      nome: cliente.getNome(),
      planoId: cliente.getPlanoId(),
    });
    await this.clienteRepository.save(clienteEntity);
  }

  async delete(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}