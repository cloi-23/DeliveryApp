import { PaginationDto } from './../common/pagination/pagination-dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { LoginManagerDto } from './dto/login-manager.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private readonly managerModel: Model<Manager>) {}

    findAll(pagination: PaginationDto) {
      const { limit , offset } = pagination
      const page = offset - 1
      return this.managerModel.find().limit(limit).skip(page * limit)
    }
  
    async findOne(id: string) {
      try {
        const manager = await this.managerModel.findOne({ _id: id }).exec();
        if (!manager) {
          throw new NotFoundException(`Manager #${id} not found`);
        }
        return manager;
      } catch (error) {
        throw new NotFoundException(`Manager #${id} not found`);
      }
     
    }
  
    async create(createManagerDto: CreateManagerDto) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(createManagerDto.password, salt)
      const user = await this.managerModel.findOne({ username: createManagerDto.username }).exec();

      if (user) {
        throw new HttpException('username already exist!', HttpStatus.CONFLICT)
      }
      const data = {
        ...createManagerDto,
        password: hashPassword
      }
      const customer = new this.managerModel(data);
 
      return customer.save()
    }
  
    async validateUser(login:LoginManagerDto): Promise<any> {
      try {
        const user = await this.managerModel.findOne({ username: login.username }).exec();
        const isMatch = await bcrypt.compare(login.password, user.password)
        if  (isMatch) {
          return 'login successful';
        }
        throw new HttpException('',HttpStatus.UNAUTHORIZED)
      } catch {
         throw new HttpException('username or password not exist!', HttpStatus.UNAUTHORIZED)
      }
    }
  
    async update(id: string, updateManagerDto: UpdateManagerDto) {
      await this.managerModel
      .findOneAndUpdate({ _id: id }, { $set: updateManagerDto }, { new: true })
      .exec();
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
    
}
