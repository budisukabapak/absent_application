import { AbsentService } from './absent.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateDto } from './dto/update.dto';
import { RegisterDto } from './dto/create.dto';


@Controller('absent')
export class AbsentController {
  constructor(private readonly absentService: AbsentService) {}

  @Get(':employee_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAdmin(@Param('employee_id') employee_id: number) {
    return this.absentService.findAll(employee_id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAdminById(@Param('id') id: number) {
    return this.absentService.findById(id);
  }

  @Post('create') 
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  create(@Body('absent') absent: Partial<RegisterDto>) {
    return this.absentService.create(absent);
  }

  @Post('update/:id') 
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body('absent') absent: Partial<UpdateDto>) {
    return this.absentService.update(id, {
      ...absent,
      date_start: new Date(absent.date_start),
      date_end: new Date(absent.date_end),
    });
  }

  @Post('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number) {
    return this.absentService.delete(id);
  }
}
