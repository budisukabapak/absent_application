import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';

import { UpdateDto } from './dto/update.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RegisterDto } from 'src/auth/dto/create.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAdmin() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAdminById(@Param('id') id: number) {
    return this.employeeService.findById(id);
  }

  @Post('update/:id') 
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body('employee') employee: Partial<UpdateDto>) {
    return this.employeeService.update(id, employee);
  }

  @Post('create') 
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  create(@Body('employee') employee: Partial<RegisterDto>) {
    return this.employeeService.create(employee);
  }

  @Post('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number) {
    return this.employeeService.delete(id);
  }
}
