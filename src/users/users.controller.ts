import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('users') // route will be "/route"
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('USER')
  @ApiQuery({
    name: 'role',
    enum: ['INTERN', 'ADMIN', 'ENGINEER'],
    required: false,
  })
  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINNER') {
    return this.usersService.findAll(role);
  }

  @ApiTags('USER')
  @Get(':id') // GET /users/:id
  fineOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.fineOne(id);
  }

  @ApiTags('USER')
  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.create(user);
  }

  @ApiTags('USER')
  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @ApiTags('USER')
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
