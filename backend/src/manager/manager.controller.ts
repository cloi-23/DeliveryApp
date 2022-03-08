import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id)
  }

  @Post()
  create(@Body('username') username: string, @Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(username, createManagerDto);
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
  async validateUser(@Body('username') user: string, 
    @Body('password') password: string) {
    return this.managerService.validateUser(user, password)
  }
}
