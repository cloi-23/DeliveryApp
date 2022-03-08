import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver, DriverrSchema } from './entities/drivers.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Driver.name,
      schema: DriverrSchema
    }
  ])],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService]
})
export class DriverModule {}
