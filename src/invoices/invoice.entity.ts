import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  amount: number;

  @Column()
  duration: number;

  @ManyToOne(() => User, (user) => user.invoices)
  user: User;

  @ManyToOne(() => Contract, (contract) => contract.invoices)
  contract: Contract;
}
