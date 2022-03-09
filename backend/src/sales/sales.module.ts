import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/order/entities/order.entity';
import { Sales, SalesSchema } from './entities/sales.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [MongooseModule.forFeature([
  {
    name: Sales.name,
    schema: SalesSchema
  }
]),
MongooseModule.forFeature([
  {
    name: Order.name,
    schema: OrderSchema
  }
])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService]
})
export class SalesModule {}
