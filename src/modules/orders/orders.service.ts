import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, productId } = createOrderDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const order = this.ordersRepository.create({
      user,
      product,
    });

    return this.ordersRepository.save(order);
  }
}
