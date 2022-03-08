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
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.deliveryService.findOne(id)
    }
  
    @Post()
    create(@Body() createDeliveryDto: CreateDeliveryDto) {
      return this.deliveryService.create(createDeliveryDto);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
      return this.deliveryService.update(id, updateDeliveryDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.deliveryService.remove(id);  
    }
    
}
