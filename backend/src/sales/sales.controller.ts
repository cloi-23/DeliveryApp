import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query} from '@nestjs/common';
import { CreateSalesDto } from './dto/create-sales-dto';
import { UpdateSalesDto } from './dto/update-sales-dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesSerivce: SalesService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.salesSerivce.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesSerivce.findOne(id)
  }

  @Post()
  create(@Body() createSalesDto: CreateSalesDto) {
    return this.salesSerivce.create(createSalesDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesDto: UpdateSalesDto) {
    return this.salesSerivce.update(id, updateSalesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesSerivce.remove(id);
  }
}
