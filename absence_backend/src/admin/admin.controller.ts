import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAdmin() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAdminById(@Param('id') id: number) {
    return this.adminService.findById(id);
  }

  @Post('update/:id') 
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body('admin') admin: Partial<UpdateDto>) {
    return this.adminService.update(id, admin);
  }

  @Post('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number) {
    return this.adminService.delete(id);
  }
}
