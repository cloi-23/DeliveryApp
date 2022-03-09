import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-delivery.dto';
import { UpdateOrderDto } from './dto/update-delivery.dto';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order> ,
    @InjectModel(Product.name) private readonly productModel: Model<Product> ,
    @InjectModel(Customer.name) private readonly CustomerModel: Model<Customer> 
    ) {}

    findAll() {
      return this.orderModel.find()
    }
  
    async findOne(id: string) {
      const order = await this.orderModel.findOne({ _id: id }).exec();
      return order;
    }
  
    async create(productId: string, userId: string, createOrderDto: CreateOrderDto) {
      const product = await this.productModel.findOne({ _id: productId }).exec();
      const customer = await this.CustomerModel.findOne({ _id: userId }).exec();  
      const data = {
        ...createOrderDto,
        price: product.price,
        name:customer.name
      }
      const order = new this.orderModel(data);
      return order.save();
    }
  
    async update(id: string, updateOrderDto: UpdateOrderDto) {
      await this.orderModel
      .findOneAndUpdate({ _id: id }, { $set: updateOrderDto }, { new: true })
      .exec();
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
}
