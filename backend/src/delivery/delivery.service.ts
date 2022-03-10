import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'
import { Order } from 'src/order/entities/order.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Driver } from 'src/driver/entities/drivers.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

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

  async findEachData() {
    const customer = await this.customerModel.find().exec();
    const driver = await this.driverModel.find().exec();
    const order = await this.orderModel.find().exec();
  }

  async create(createDelivery: CreateDeliveryDto) {
    const customer = await this.customerModel.findOne({ _id: createDelivery.userId }).exec();
    const driver = await this.driverModel.findOne({ _id: createDelivery.driverId }).exec();
    const order = await this.orderModel.findOne({ _id: createDelivery.orderId }).exec();

    const data = {
      name: customer.name,
      driverId: driver['_id'],
      orderId: order['_id'],
      customerAddr: customer.address,
      total: order.price * order.quantity 
    }
    const delivery = new this.deliveryModel(data)
    return delivery.save();
  }

  async update(id: string, updateDelivery: UpdateDeliveryDto) {
    await this.deliveryModel
    .findOneAndUpdate({ _id: id }, { $set: updateDelivery }, { new: true })
    .exec();
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return product.remove();
  }
}
