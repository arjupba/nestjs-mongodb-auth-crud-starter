import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { Auth } from '@apps/auth/guards';
import { RoleEnum } from '@apps/users/domain/user.type';
import { CreateVegetableDto } from '@apps/vegetables/dto/create-vegetable.dto';
import { UpdateVegetableDto } from '@apps/vegetables/dto/update-vegetable.dto';
import { VegetablesService } from '@apps/vegetables/vegetables.service';

import { NotFoundInterceptor } from '@libs/notFoundInterceptor';

@Controller('vegetables')
export class VegetablesController {
  constructor(private readonly vegetablesService: VegetablesService) {}

  @Post()
  @Auth(RoleEnum.User)
  create(@Body() createVegetableDto: CreateVegetableDto) {
    return this.vegetablesService.create(createVegetableDto);
  }

  @Get()
  @Auth(RoleEnum.Admin)
  findAll() {
    return this.vegetablesService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin)
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  findOne(@Param('id') id: string) {
    return this.vegetablesService.findOne(id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  update(@Param('id') id: string, @Body() updateVegetableDto: UpdateVegetableDto) {
    return this.vegetablesService.update(id, updateVegetableDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  remove(@Param('id') id: string) {
    return this.vegetablesService.remove(id);
  }
}
