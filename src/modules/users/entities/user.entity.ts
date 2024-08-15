import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Expose } from 'class-transformer';


export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
