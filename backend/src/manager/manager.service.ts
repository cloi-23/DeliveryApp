import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private readonly managerModel: Model<Manager>) {}

    findAll() {
      return this.managerModel.find()
    }
  
    async findOne(id: string) {
      const manager = await this.managerModel.findOne({ _id: id }).exec();
      if (!manager) {
        throw new NotFoundException(`Customer #${id} not found`);
      }
      return manager;
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
  
    async validateUser(username: string, pass: string): Promise<any> {
      try {
        const user = await this.managerModel.findOne({ username: username }).exec();
        const isMatch = await bcrypt.compare(pass, user.password)
        if  (isMatch) {
          return user;
        }
        throw console.error();
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
