import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Transportadora from '@modules/transportadoras/infra/typeorm/entities/Transportadora';

@Entity('viagens')
class Travel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cte: string;

  @Column()
  numeroviagem: string;

  @Column()
  origem: string;

  @Column()
  destino: string;

  @Column()
  mercadoria: string;

  @Column()
  placa: string;

  @Column()
  cpfmotorista: string;

  @ManyToOne(() => Transportadora)
  @JoinColumn({ name: 'transportadora_id' })
  transportadora: Transportadora;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Travel;
