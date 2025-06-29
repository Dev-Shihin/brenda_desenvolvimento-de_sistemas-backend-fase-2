import { Cobranca } from '../entities/cobranca.entity';

export interface ICobrancaRepository {
  create(cobranca: Cobranca): Promise<Cobranca>;
  findById(id: string): Promise<Cobranca | null>;
  findByClienteId(clienteId: number): Promise<Cobranca[]>;
  update(id: string, cobranca: Partial<Cobranca>): Promise<Cobranca | null>;
  delete(id: string): Promise<void>;
}