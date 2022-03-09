import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Order } from 'src/order/entities/order.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery.name) private readonly deliveryModel: Model <Delivery> ,
  @InjectModel(Order.name) private readonly orderModel: Model <Delivery> ,
  @InjectModel(Customer.name) private readonly customerModel: Model <Delivery>) {}

  findAll() {
    return this.deliveryModel.find()
  }

  async findOne(id: string) {
    const delivery = await this.deliveryModel.findOne({ _id: id }).exec();
    return delivery;
  }

  create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = new this.deliveryModel(createDeliveryDto);
    return delivery.save();
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    await this.deliveryModel
    .findOneAndUpdate({ _id: id }, { $set: updateDeliveryDto }, { new: true })
    .exec();
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return product.remove();
  }
}
