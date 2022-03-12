import { PaginationDto } from './dto/pagination-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() pagination:PaginationDto) {   
    return this.productService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto,
    @Body('name') name: string) {
    return this.productService.create(name, createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  

  
}
