import { PlanoAtivo } from '../entities/plano-ativo.entity';

export interface IPlanoAtivoRepository {
  create(planoAtivo: PlanoAtivo): Promise<PlanoAtivo>;
  findByClienteId(clienteId: number): Promise<PlanoAtivo[]>;
  findOne(options: any): Promise<PlanoAtivo | null>;
  save(planoAtivo: PlanoAtivo): Promise<PlanoAtivo>;
}