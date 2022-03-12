import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginDriveDto } from './dto/login-driver.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/drivers.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>) {}

    findAll(pagination: PaginationDto) {
      const{ limit , offset } = pagination
      const page = offset - 1
      return this.driverModel.find().limit(limit).skip(page * limit)
    }
  
    async findOne(id: string) {
      try {
        const driver = await this.driverModel.findOne({ _id: id }).exec();
        if (!driver) {
          throw new NotFoundException(`Driver #${id} not found`);
        }
        return driver;
      } catch (error) {
        throw new NotFoundException(`Driver #${id} not found`);
      }
     
    }
  
  async create(createDriverDto: CreateDriverDto) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(createDriverDto.password, salt)
      const user = await this.driverModel.findOne({ username: createDriverDto.username }).exec();

      if (user) {
        throw new HttpException('username already exist!', HttpStatus.CONFLICT)
      }
      const data = {
        ...createDriverDto,
        password: hashPassword

      }
      const customer = new this.driverModel(data);
 
      return customer.save();
    }
  
    async update(id: string, updateDriverDto: UpdateDriverDto) {
      await this.driverModel
      .findOneAndUpdate({ _id: id }, { $set: updateDriverDto }, { new: true })
      .exec();
    }
    async validateUser(login:LoginDriveDto): Promise<any> {
      try {
        const user = await this.driverModel.findOne({ username: login.username }).exec();
        const isMatch = await bcrypt.compare(login.password, user.password)
        if (isMatch) {
         // const { password, ...result } = user;      
          return 'login successful';
        }
        throw new HttpException('',HttpStatus.UNAUTHORIZED)
      } catch (err){
         throw new HttpException('username or password not exist!', HttpStatus.UNAUTHORIZED)
      }
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
}
