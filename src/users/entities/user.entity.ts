import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/customer.entity';
import { Contract } from '../../contracts/contract.entity';
import { Invoice } from '../../invoices/invoice.entity';
import { Session } from '../../sessions/session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  password: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
