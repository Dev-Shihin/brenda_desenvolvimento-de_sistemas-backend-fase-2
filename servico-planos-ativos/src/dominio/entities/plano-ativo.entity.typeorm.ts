import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('plano_ativo')
export class PlanoAtivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteId: number;

  @Column()
  planoId: number;

  @Column()
  nomePlano: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column()
  ativo: boolean;

  @Column()
  dataAtivacao: Date;
}