import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('plano_ativos')
export class PlanoAtivo {
  @ObjectIdColumn()
  id: string;

  @Column({ type: 'int', nullable: false })
  clienteId: number;

  @Column({ type: 'int', nullable: false })
  planoId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nomePlano: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor: number;

  @Column({ type: 'date', nullable: false })
  dataAtivacao: Date;

  @Column({ type: 'boolean', default: true, nullable: false })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}