import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query} from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService) {} 
    
    @Get()
    findAll(@Query() pagination: PaginationDto) {
      return this.deliveryService.findAll(pagination);
    }
  
    @Get('get/:id')
    findOne(@Param('id') id: string) {
      return this.deliveryService.findOne(id)
    }

  
    @Post()
    create(@Body() createDelivery: Object[]) {    
    return this.deliveryService.create(createDelivery);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDelivery) {
      return this.deliveryService.update(id, updateDelivery);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.deliveryService.remove(id);  
    }
    
}
