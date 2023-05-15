import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.model';

@Entity({ name: 'stocks' })
export class Stock {
  @PrimaryColumn('uuid')
  productId: string;

  @Column({ type: 'integer' })
  count: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
