import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-delivery.dto';
import { UpdateOrderDto } from './dto/update-delivery.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('customer/:userId')
  findAllOrderByCust(@Param('userId') id: string) {
    return this.orderService.findAllOrderByCust(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id)
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto,
    @Body('productId') productId: string,
    @Body('userId') userId: string) {
    return this.orderService.create(productId, userId, createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('customer/:userId')
  RemoveAllOrderByCust(@Param('userId') id: string) {
    return this.orderService.RemoveAllOrderByCust(id);  
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);  
  }
}

