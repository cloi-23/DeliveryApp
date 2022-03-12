import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.purchaseService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id)
  }

  @Post()
  create(@Param('id') id: string, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);  
  }

}
