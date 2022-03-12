import { Product } from './../product/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Purhcase } from './entities/purchase.entities';
import { Model } from 'mongoose'
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
     @InjectModel(Purhcase.name)
      private readonly purchaseModel: Model<Purhcase>,
     @InjectModel(Product.name)
      private readonly productModel: Model<Product>
      ){}


  async findAll() {
   
    const purchaseList = await this.purchaseModel.find()
    const purchaseProduct = []
    for (const purchase of purchaseList) {
      const productId = purchase.productId
      const product = await this.productModel.findOne({_id: productId})
      const data = {
        purchase,
         product
      }
      purchaseProduct.push(data)
      
    }
    
    
    return purchaseProduct
  }

  async findOne(id: string) {
    try {
      const purchase = await this.purchaseModel.findOne({ _id: id }).exec();
      if (!purchase) {
        throw new NotFoundException(`Purchase #${id} not found`);
      }
    return purchase;
    } catch (error) {
      throw new NotFoundException(`Purchase #${id} not found`);
    }
    
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
