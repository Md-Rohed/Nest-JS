import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';

export class EmployeeCreateInput {
  @ApiProperty()
  name: string;
  email: string;
  role: 'INTERN' | 'ADMIN' | 'ENGINNER';
}
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiTags('EMPLOYEE')
  @ApiBody({ type: EmployeeCreateInput })
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiTags('EMPLOYEE')
  @SkipThrottle({ default: false })
  @ApiQuery({
    name: 'role',
    enum: ['INTERN', 'ADMIN', 'ENGINNER'],
    required: false,
  })
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINNER') {
    return this.employeesService.findAll(role);
  }

  @ApiTags('EMPLOYEE')
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  // ) {
  //   return this.employeesService.update(+id, updateEmployeeDto);
  // }

  @ApiTags('EMPLOYEE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
