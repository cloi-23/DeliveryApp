import { PaginationDto } from './../common/pagination/pagination-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-delivery.dto';
import { UpdateOrderDto } from './dto/update-delivery.dto';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { Delivery } from 'src/delivery/entities/delivery.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order> ,
    @InjectModel(Product.name) private readonly productModel: Model<Product> ,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer> ,
    @InjectModel(Delivery.name) private readonly deliveryModel: Model<Delivery> 
    ) {}

    async findAll(pagination: PaginationDto) {
      const { limit , offset } = pagination
      const page = offset - 1
      const orderList = await this.orderModel.find().limit(limit).skip(page * limit)
      const customerOrder = []
      for (const order of orderList) {
        const userId = order.userId
        const customer = await this.customerModel.findOne({_id: userId})
        const data = {
          order,
          customer
        }
         customerOrder.push(data)    
      }
      return customerOrder
    }
    
    async findAllOrderByCust(id: string) {
      const user = await this.orderModel.find({ userId: id }).exec()
      return (user.filter( x => x.status == 'packaging')) 
      
    }
  
    async findOne(id: string) {
      try {
        const order = await this.orderModel.findOne({ _id: id }).exec();
        if (!order) {
          throw new NotFoundException(`Order #${id} not found`);
        }
        return order;
      } catch (error) {
        throw new NotFoundException(`Order #${id} not found`);
      }
     
    }
  
    async create(productId: string, userId: string, createOrderDto) {
      const product = await this.productModel.findOne({ _id: productId }).exec();
      const customer = await this.customerModel.findOne({ _id: userId }).exec();  
      // const data = {
      //   ...createOrderDto,
      //   price: product.price * createOrderDto.quantity,
      //   customerName:customer.name,
      //   productName: product.name
      // }
      await this.orderModel.insertMany(createOrderDto)
      // const order = new this.orderModel(data);
      // return order.save();
    }
  
    async update(updateOrderDto: UpdateOrderDto) {
      const deliveries = await this.deliveryModel.find()
      for (let deliver in deliveries) {
        const orderId = deliveries[deliver].orderId        
        await this.orderModel.findOneAndUpdate({ _id: orderId }, 
        { $set: updateOrderDto }, { new: true })
        .exec();
      }
    }

     async RemoveAllOrderByCust(id: string) {
      return this.orderModel.deleteMany({ userId: id })    }

      async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
}
