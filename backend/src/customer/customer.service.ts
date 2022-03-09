import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './entities/customer.entity';
import { Model } from 'mongoose'
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>) {}

    findAll() {
      return this.customerModel.find()
    }
  
    async findOne(id: string) {
      const customer = await this.customerModel.findOne({ _id: id });
      if (!customer) {
        throw new NotFoundException(`Customer #${id} not found`);
      }
      return customer 
    }
    
    async create(createCustomerDto: CreateCustomerDto) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(createCustomerDto.password, salt)
      const user = await this.customerModel.findOne({ username: createCustomerDto.username }).exec();

      if (user) {
        throw new HttpException('username already exist!', HttpStatus.CONFLICT)
      }
      const data = {
        ...createCustomerDto,
        password: hashPassword

      }
      const customer = new this.customerModel(data);
 
      return customer.save();
    }
  
    async validateUser(username: string, pass: string): Promise<any> {
      try {
        const user = await this.customerModel.findOne({ username: username }).exec();
        const isMatch = await bcrypt.compare(pass, user.password)
        if (isMatch) {
          const { password, ...result } = user;      
          return 'login successful';
        }
        throw new HttpException('',HttpStatus.UNAUTHORIZED)
      } catch (err){
         throw new HttpException('username or password not exist!', HttpStatus.UNAUTHORIZED)
      }
    }
  
    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
      await this.customerModel
      .findOneAndUpdate({ _id: id }, { $set: updateCustomerDto }, { new: true })
      .exec();
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }

}
