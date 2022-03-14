import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/customer.entity';
import { Session } from '../sessions/session.entity';
import { Invoice } from '../invoices/invoice.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hourlyRate: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  services: string;

  @ManyToOne(() => User, (user) => user.contracts, { nullable: false })
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  customer: Customer;

  @OneToMany(() => Session, (session) => session.contract)
  sessions: Session[];

  @OneToMany(() => Invoice, (invoice) => invoice.contract)
  invoices: Invoice[];
}
