import { Controller, Get, Body, Param, Post } from '@nestjs/common';

import { ProductService } from './services/product.service';

@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProductsList() {
    return await this.productService.getProductsList();
  }

  @Get(`/:productId`)
  async getProductsById(@Param(`productId`) productId: string) {
    return await this.productService.getProductsById(productId);
  }

  @Post()
  async createProduct(@Body() body) {
    return await this.productService.createProduct(body);
  }
}
