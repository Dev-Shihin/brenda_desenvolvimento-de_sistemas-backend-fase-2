import { Cliente } from './cliente.entity';

export const CLIENTE_REPOSITORY = 'CLIENTE_REPOSITORY';

export interface IClienteRepository {
  findById(id: number): Promise<Cliente | null>;
  findByPlanoId(planoId: number): Promise<Cliente[]>;
  findAll(): Promise<Cliente[]>;
  save(cliente: Cliente): Promise<void>;
  delete(id: number): Promise<void>;
}