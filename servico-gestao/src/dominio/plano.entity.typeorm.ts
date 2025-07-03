import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('planos')
export class PlanoEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor!: number;

  constructor(id?: number, nome?: string, valor?: number) {
    if (id !== undefined) {
      if (id <= 0) throw new Error('ID deve ser maior que zero');
      this.id = id;
    }
    if (nome !== undefined) {
      if (!nome || nome.trim() === '') throw new Error('Nome é obrigatório');
      this.nome = nome;
    }
    if (valor !== undefined) {
      if (valor < 0) throw new Error('Valor não pode ser negativo');
      this.valor = valor;
    }
  }
}