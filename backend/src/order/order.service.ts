import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-delivery.dto';
import { UpdateOrderDto } from './dto/update-delivery.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order> 
    ) {}

    findAll() {
      return this.orderModel.find()
    }
  
    async findOne(id: string) {
      const order = await this.orderModel.findOne({ _id: id }).exec();
      return order;
    }
  
    create(createOrderDto: CreateOrderDto) {
      const order = new this.orderModel(createOrderDto);
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
