import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';
import { OrderModule } from './order/order.module';
import { ManagerModule } from './manager/manager.module';
import { DriverModule } from './driver/driver.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CustomerModule } from './customer/customer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UploaderController } from './uploader/uploader.controller';
import { UploaderService } from './uploader/uploader.service';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/DeliveryApp'), 
    ProductModule, 
    SalesModule, 
    OrderModule, 
    ManagerModule, 
    DriverModule, 
    DeliveryModule, 
    CustomerModule, 
    PurchaseModule, UploaderModule],
  controllers: [UploaderController],
  providers: [UploaderService],
})
export class AppModule {}
