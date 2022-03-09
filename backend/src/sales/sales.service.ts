import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Sales } from './entities/sales.entity';
import { CreateSalesDto } from './dto/create-sales-dto';
import { UpdateSalesDto } from './dto/update-sales-dto';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales.name) private readonly salesModel: Model<Sales>, 
    @InjectModel(Order.name) private readonly orderModel: Model<Order>
    ) {}

    findAll() {
      return this.salesModel.find()
    }
  
    async findOne(id: string) {
      try {
        const sales = await this.salesModel.findOne({ _id: id }).exec();
        if (!sales) {
          throw new NotFoundException(`Sale #${id} not found`);
        }
        return sales;
      } catch (error) {
        throw new NotFoundException(`Sale #${id} not found`);
      }
    }
  
    async create(createSalesDto: CreateSalesDto) {
      const order = await this.orderModel.findOne({ _id: createSalesDto.orderId }).exec();
      const data = {
        orderId: order['_id']
      }
      const sales = new this.salesModel(data);
      return sales.save();
    }
  
    async update(id: string, updateSalesDto: UpdateSalesDto) {
      await this.salesModel
      .findOneAndUpdate({ _id: id }, { $set: updateSalesDto }, { new: true })
      .exec();
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
}
