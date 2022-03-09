import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery.name) private readonly deliveryMode: Model <Delivery> ) {}

  findAll() {
    return this.deliveryMode.find()
  }

  async findOne(id: string) {
    const delivery = await this.deliveryMode.findOne({ _id: id }).exec();
    if (!delivery) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return delivery;
  }

  create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = new this.deliveryMode(createDeliveryDto);
    return delivery.save();
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    await this.deliveryMode
    .findOneAndUpdate({ _id: id }, { $set: updateDeliveryDto }, { new: true })
    .exec();
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return product.remove();
  }
}
