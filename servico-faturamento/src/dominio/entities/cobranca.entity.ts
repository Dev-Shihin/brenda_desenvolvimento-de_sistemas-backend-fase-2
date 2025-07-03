import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('cobrancas')
export class Cobranca {
  @ObjectIdColumn()
  id: string; 

  @Column({ unique: true })
  cobrancaId: number;

  @Column()
  clienteId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({
    type: 'enum',
    enum: ['pendente', 'pago', 'cancelado'],
  })
  status: string;

  @Column()
  dataVencimento: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}