import { Plano } from './plano.entity';

export const PLANO_REPOSITORY = 'PLANO_REPOSITORY';

export interface IPlanoRepository {
  findById(id: number): Promise<Plano | null>;
  findAll(): Promise<Plano[]>;
  save(plano: Plano): Promise<void>;
  delete(id: number): Promise<void>;
}