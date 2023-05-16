import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CartModule } from '../cart/cart.module';
import { OrderService } from './services';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule, CartModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
