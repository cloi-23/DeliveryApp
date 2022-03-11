import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'
import { Order } from 'src/order/entities/order.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Driver } from 'src/driver/entities/drivers.entity';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery.name) private readonly deliveryModel: Model <Delivery> ,
  @InjectModel(Order.name) private readonly orderModel: Model <Order> ,
  @InjectModel(Customer.name) private readonly customerModel: Model <Customer> ,
  @InjectModel(Driver.name) private readonly driverModel: Model <Driver>) {}

  findAll() {
    return this.deliveryModel.find()
  }

  async findOne(id: string) {

    try {
      const delivery = await this.deliveryModel.findOne({ _id: id }).exec();
      if (!delivery) {
        throw new NotFoundException(`Delivery #${id} not found`);
      }
      return delivery;
    } catch (error) {
      throw new NotFoundException(`Delivery #${id} not found`);
    }
  }
  
    create(createDelivery: Object[]) {
    this.deliveryModel.insertMany(createDelivery) 
  }

  async update(id: string, updateDelivery) {
    await this.deliveryModel
    .findOneAndUpdate({ _id: id }, { $set: updateDelivery }, { new: true })
    .exec();
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return product.remove();
  }
}
