import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService) {} 
    
    @Get()
    findAll() {
      return this.deliveryService.findAll();
    }
  
    @Get('get/:id')
    findOne(@Param('id') id: string) {
      return this.deliveryService.findOne(id)
    }

    @Get('info')
    findEachData() {
      return this.deliveryService.forDeliver()
    }
  
    @Post()
    create(@Body() createDelivery: CreateDeliveryDto) {
      return this.deliveryService.create(createDelivery);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDelivery: UpdateDeliveryDto) {
      return this.deliveryService.update(id, updateDelivery);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.deliveryService.remove(id);  
    }
    
}
