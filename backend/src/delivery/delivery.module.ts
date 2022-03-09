import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/customer/entities/customer.entity';
import { Driver, DriverrSchema } from 'src/driver/entities/drivers.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { Delivery, DeliverySchema } from './entities/delivery.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Delivery.name,
      schema: DeliverySchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Driver.name,
      schema: DriverrSchema
    }
  ])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService]
})
export class DeliveryModule {}
