import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  VegetableEntity,
  VegetableSchema,
} from '@apps/vegetables/entities/vegetable.entity';
import { VegetablesController } from '@apps/vegetables/vegetables.controller';
import { VegetablesService } from '@apps/vegetables/vegetables.service';

import { LoggerModule } from '@libs/logger';

@Module({
  controllers: [VegetablesController],
  imports: [
    MongooseModule.forFeature([{ name: VegetableEntity.name, schema: VegetableSchema }]),
    LoggerModule.forRoot('vegetableModule'),
  ],
  providers: [VegetablesService],
})
export class VegetablesModule {}
