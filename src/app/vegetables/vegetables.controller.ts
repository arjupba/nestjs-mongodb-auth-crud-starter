import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VegetablesService } from './vegetables.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { NotFoundInterceptor } from '../../lib/notFoundInterceptor';
import { QueryMen } from '../../lib/queryMen/queryMenDecorator';
import { PaginationQueryDto } from '../../lib/queryMen/queryMenDto';
import { ParamIdDto } from '../../lib/paramIdDto';

@ApiTags('vegetables')
@UseGuards(JwtAuthGuard)
@Controller('vegetables')
export class VegetablesController {
  constructor(private readonly vegetablesService: VegetablesService) {}

  @Post()
  create(@Body() createVegetableDto: CreateVegetableDto) {
    return this.vegetablesService.create(createVegetableDto);
  }

  @Get()
  findAll(
    @QueryMen() { query, select, cursor },
    @Query() _: PaginationQueryDto,
  ) {
    return this.vegetablesService.findAll(query, select, cursor);
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  findOne(@Param() params: ParamIdDto) {
    return this.vegetablesService.findOne(params.id);
  }

  @Patch(':id')
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  update(
    @Param() params: ParamIdDto,
    @Body() updateVegetableDto: UpdateVegetableDto,
  ) {
    return this.vegetablesService.update(params.id, updateVegetableDto);
  }

  @Delete(':id')
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  remove(@Param() params: ParamIdDto) {
    return this.vegetablesService.remove(params.id);
  }
}
