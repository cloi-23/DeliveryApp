import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginCustomerDto } from './dto/login-cutomer.dto';
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

    findAll(pagination: PaginationDto) {
      const {limit ,offset} = pagination
      const page = offset - 1
      return this.customerModel.find().limit(limit).skip(page * limit)
    }
  
    async findOne(id: string) {
      try{
          const customer = await this.customerModel.findOne({ _id: id }).exec();
            if (!customer) {
              throw new NotFoundException(`Customer #${id} not found`);
            }
            return customer 
      }
       catch(err){
           throw new NotFoundException(`Customer #${id} not found`);
      }
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
  
    async validateUser(login:LoginCustomerDto): Promise<any> {
      try {
        const user = await this.customerModel.findOne({ username: login.username }).exec();
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
