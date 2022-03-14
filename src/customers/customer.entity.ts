import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentFirstname: string;

  @Column()
  studentLastname: string;

  @Column()
  responsibleFirstname: string;

  @Column()
  responsibleLastname: string;

  @Column()
  street: string;

  @Column()
  zipcode: string;

  @Column()
  city: string;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  mail1: string;

  @Column()
  mail2: string;

  @ManyToOne(() => User, (user) => user.customers, { nullable: false })
  user: User;

  @OneToMany(() => Contract, (contract) => contract.customer)
  contracts: Contract[];
}
