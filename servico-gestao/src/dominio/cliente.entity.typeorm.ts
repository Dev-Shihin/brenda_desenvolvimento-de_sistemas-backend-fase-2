import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  planoId: number;

  @Column({ nullable: true })
  status?: string; // Novo campo opcional

  @Column({ type: 'datetime', nullable: true })
  ultimaCobranca?: Date; // Novo campo opcional
}