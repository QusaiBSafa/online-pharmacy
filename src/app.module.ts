import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { User } from './modules/users/entities/user.entity';
import { Order } from './modules/orders/entities/order.entity';
import { Product } from './modules/products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [User, Order, Product],
          synchronize: true, // Set to false in production
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
  ],
})
export class AppModule {}
