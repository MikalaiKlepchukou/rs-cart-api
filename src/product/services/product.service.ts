import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Product } from '../../database/models/product.model';
import { Stock } from '../../database/models/stock.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async getProductsList() {
    const stocks = await this.stockRepository.find({ relations: ['product'] });
    const productsAndCount = stocks.map((stock) => {
      const product = stock.product;
      return {
        count: stock.count,
        ...product,
      };
    });

    return productsAndCount;
  }

  async getProductsById(productId) {
    const stock = await this.stockRepository.findOne({
      where: { productId },
      relations: ['product'],
    });
    const product = stock.product;

    return { count: stock.count, ...product };
  }

  async createProduct({ title, description, count, price }) {
    const id = uuid();
    const newProduct = { id, title, description, price };
    const newStock = { productId: id, count };

    await this.productRepository.save(newProduct);
    await this.stockRepository.save(newStock);

    return { count, ...newProduct };
  }
}
