import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginManagerDto } from './dto/login-manager.dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.managerService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id)
  }

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(id);  
  }

  @Post('/login')
  async validateUser(@Body() login: LoginManagerDto) {
    return this.managerService.validateUser(login)
  }
}
