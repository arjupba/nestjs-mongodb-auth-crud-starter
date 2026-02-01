import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QueryMen, type QueryMenType, UseQueryMen } from 'nestjs-querymen';

import type { AuthenticatedRequest } from '@apps/auth/domain/auth.type';
import { Auth } from '@apps/auth/guards';
import RoleGuard from '@apps/auth/guards/role.gurad';
import { RoleEnum } from '@apps/users/domain/user.type';
import { UpdateUserDtoAdmin, UpdateUserDtoSelf } from '@apps/users/dto/update-user.dto';
import { UsersService } from '@apps/users/users.service';

import { NotFoundInterceptor } from '@libs/notFoundInterceptor';
import { ParamIdDto } from '@libs/paramIdDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseQueryMen({
    limit: {
      default: 10,
      max: 105,
      min: 1,
    },
    page: {
      default: 1,
      max: 1000,
      min: 1,
    },
    sort: '-createdAt',
  })
  @Auth(RoleEnum.Admin)
  findAll(@QueryMen() q: QueryMenType) {
    return this.usersService.findAll(q);
  }

  @Get('self')
  @Auth(RoleEnum.User)
  findSelf(@Request() req: AuthenticatedRequest) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @UseGuards(RoleGuard(RoleEnum.Admin))
  @UseInterceptors(new NotFoundInterceptor('No user found for given Id'))
  findOne(@Param() param: ParamIdDto) {
    return this.usersService.findOne(param.id);
  }

  @Patch('self')
  @UseGuards(RoleGuard(RoleEnum.Admin))
  updateSelf(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDtoSelf,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(RoleEnum.Admin))
  @UseInterceptors(new NotFoundInterceptor('No user found for given Id'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDtoAdmin) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(RoleEnum.Admin))
  @UseInterceptors(new NotFoundInterceptor('No user found for given Id'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
