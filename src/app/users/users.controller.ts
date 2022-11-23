import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, Public } from '../auth/guards/jwt.auth.guard';
import { User } from '../../lib/userDecorator';
import { RoleEnum } from './entities/user.entity';
import RoleGuard from '../auth/guards/role.gurad';
import { NotFoundInterceptor } from '../../lib/notFoundInterceptor';
import { QueryMen } from '../../lib/queryMen/queryMenDecorator';
import { PaginationQueryDto } from '../../lib/queryMen/queryMenDto';
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('signUp')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RoleGuard(RoleEnum.Admin))
  @Get()
  findAll(
    @QueryMen() { query, select, cursor },
    @Query() _: PaginationQueryDto,
  ) {
    return this.usersService.findAll(query, select, cursor);
  }

  @UseGuards(RoleGuard(RoleEnum.Admin, true))
  @UseInterceptors(new NotFoundInterceptor('No user found for given userId'))
  @Get(':id')
  findOne(@Param('id') id: string, @User() user) {
    const userId = id === 'self' ? user.id : id;

    return this.usersService.findOne(userId);
  }

  @UseGuards(RoleGuard(RoleEnum.Admin, true))
  @UseInterceptors(new NotFoundInterceptor('No user found for given userId'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user,
  ) {
    const userId = id === 'self' ? (delete updateUserDto.roles, user.id) : id;

    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(RoleGuard(RoleEnum.Admin))
  @UseInterceptors(new NotFoundInterceptor('No user found for given userId'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
