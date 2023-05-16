import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  userId = '1a95c74f-924b-4076-b84a-173274078194';
  constructor(private cartService: CartService) {}

  @Get()
  async findUserCart() {
    const cart = await this.cartService.findOrCreateByUserId(this.userId);
    return cart.items;
  }

  @Put()
  async updateUserCart(@Body() body) {
    const cart = await this.cartService.updateByUserId(this.userId, body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  @Delete()
  async clearUserCart() {
    await this.cartService.removeByUserId(this.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
