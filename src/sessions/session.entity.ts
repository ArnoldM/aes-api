import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  schedule: string;

  @Column()
  duration: number;

  @Column()
  location: string;

  @Column()
  notes: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @ManyToOne(() => Contract, (contract) => contract.sessions)
  contract: Contract;
}
