import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/customer/entities/customer.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema
    }
  ]),MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ]),MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema
    }
  ])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
