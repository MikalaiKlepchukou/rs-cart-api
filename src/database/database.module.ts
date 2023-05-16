import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cart } from './models/cart.model';
import { CartItem } from './models/cart-item.model';
import { Order } from './models/order.model';
import { User } from './models/user.model';
import { Product } from './models/product.model';
import { Stock } from './models/stock.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/database/models/*.model{.ts,.js}'],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Cart, CartItem, User, Order, Stock, Product]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
