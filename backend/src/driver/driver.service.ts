import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/drivers.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>) {}

    findAll() {
      return this.driverModel.find()
    }
  
    async findOne(id: string) {
      const driver = await this.driverModel.findOne({ _id: id }).exec();
      return driver;
    }
  
    create(createDriverDto: CreateDriverDto) {
      const driver = new this.driverModel(createDriverDto);
      return driver.save();
    }
  
    async update(id: string, updateDriverDto: UpdateDriverDto) {
      await this.driverModel
      .findOneAndUpdate({ _id: id }, { $set: updateDriverDto }, { new: true })
      .exec();
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
}
