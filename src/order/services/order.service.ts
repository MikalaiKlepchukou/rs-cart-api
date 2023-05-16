import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { Order } from '../../database/models/order.model';
import { Cart, CartStatus } from '../../database/models/cart.model';
import { CartService } from '../../cart/services/cart.service';
import { calculateCartTotal } from '../../cart/models-rules';

@Injectable()
export class OrderService {
  userId = '1a95c74f-924b-4076-b84a-173274078194';

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private cartService: CartService,
  ) {}

  async findAll() {
    return await this.orderRepository.find({
      relations: ['cart', 'cart.items'],
    });
  }

  async findById(orderId) {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['cart', 'cart.items'],
    });
  }

  async create(data) {
    const cart = await this.cartService.findByUserId(this.userId);
    const { id: cartId } = cart;
    const total = calculateCartTotal(cart);

    let newOrder;
    await getConnection().transaction(async (entityManager) => {
      const cart = await entityManager.findOne(Cart, cartId, {
        relations: ['items'],
      });
      newOrder = new Order();
      newOrder.cartId = cartId;
      newOrder.userId = this.userId;
      newOrder.status = CartStatus.ORDERED;
      newOrder.comments = data.address.comment;
      newOrder.payment = data.payment;
      newOrder.total = total;
      newOrder.delivery = JSON.stringify({
        firstName: data.address.firstName,
        lastName: data.address.lastName,
        address: data.address.address,
      });

      await entityManager.save(newOrder);
      cart.status = CartStatus.ORDERED;
      await entityManager.save(cart);
    });

    return newOrder;
  }

  async update(orderId, data) {
    return await this.orderRepository.update({ id: orderId }, data);
  }

  async deleteOrder(orderId) {
    return await this.orderRepository.delete(orderId);
  }

  async changeStatus(orderId, data: { status: CartStatus; comment: string }) {
    return await this.update(orderId, {
      status: data.status,
      comments: data.comment,
    });
  }
}
