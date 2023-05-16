import {
  Controller,
  HttpStatus,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';

import { CartStatus } from '../database/models/cart.model';
import { OrderService } from './services/order.service';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(`/:orderId`)
  async findOneById(@Param(`orderId`) orderId: string) {
    return await this.orderService.findById(orderId);
  }

  @Put(`/:orderId/status`)
  async changeStatus(
    @Param(`orderId`) orderId: string,
    @Body() body: { status: CartStatus; comment: string },
  ) {
    return await this.orderService.changeStatus(orderId, body);
  }

  @Post()
  async checkout(@Body() body) {
    const order = await this.orderService.create(body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }

  @Delete(`/:orderId`)
  async deleteOrder(@Param(`orderId`) orderId: string) {
    const id = await this.orderService.deleteOrder(orderId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted',
      data: { id },
    };
  }
}
