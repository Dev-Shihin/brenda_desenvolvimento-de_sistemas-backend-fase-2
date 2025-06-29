import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('planos')
export class PlanoEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}