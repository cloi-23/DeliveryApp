import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Purhcase } from './entities/purchase.entities';
import { Model } from 'mongoose'
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(@InjectModel(Purhcase.name) private readonly purchaseModel: Model<Purhcase>) {} 

  findAll() {
    return this.purchaseModel.find()
  }

  async findOne(id: string) {
    const purchase = await this.purchaseModel.findOne({ _id: id }).exec();
    if (!purchase) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return purchase;
  }

  create(creatPurchaseDto: CreatePurchaseDto) {
    const purchase = new this.purchaseModel(creatPurchaseDto);
    return purchase.save();
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    await this.purchaseModel
    .findOneAndUpdate({ _id: id }, { $set: updatePurchaseDto }, { new: true })
    .exec();
  }

  async remove(id: string) {
    const purchase = await this.findOne(id)
    return purchase.remove();
  }
}
