import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  planoId!: number;

  @Column({ default: 'ativo' })
  statusPlano!: string;

  constructor(id?: number, nome?: string, planoId?: number, statusPlano?: string) {
    if (id !== undefined) {
      if (id <= 0) throw new Error('ID deve ser maior que zero');
      this.id = id;
    }
    if (nome !== undefined) {
      if (!nome || nome.trim() === '') throw new Error('Nome é obrigatório');
      this.nome = nome;
    }
    if (planoId !== undefined) {
      if (planoId <= 0) throw new Error('PlanoId deve ser maior que zero');
      this.planoId = planoId;
    }
    if (statusPlano !== undefined) {
      if (!['ativo', 'cancelado', 'suspenso'].includes(statusPlano)) {
        throw new Error('Status do plano inválido. Use: ativo, cancelado ou suspenso');
      }
      this.statusPlano = statusPlano;
    }
  }
}