import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Product)
  product: Product;
}
