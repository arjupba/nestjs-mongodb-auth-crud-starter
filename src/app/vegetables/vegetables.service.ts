import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateVegetableDto } from '@apps/vegetables/dto/create-vegetable.dto';
import { UpdateVegetableDto } from '@apps/vegetables/dto/update-vegetable.dto';
import {
  VegetableDocument,
  VegetableEntity,
} from '@apps/vegetables/entities/vegetable.entity';

@Injectable()
export class VegetablesService {
  constructor(
    @InjectModel(VegetableEntity.name)
    private readonly vegetableModel: Model<VegetableDocument>,
  ) {}

  async create(createVegetableDto: CreateVegetableDto) {
    return (await this.vegetableModel.create(createVegetableDto)).view();
  }

  async findAll() {
    return (await this.vegetableModel.find().exec()).map((vegetable) => vegetable.view());
  }

  async findOne(id: string) {
    return (await this.vegetableModel.findById(id).exec())?.view();
  }

  async update(id: string, updateVegetableDto: UpdateVegetableDto) {
    const vegetable = await this.vegetableModel.findById(id);

    if (!vegetable) return null;

    Object.assign(vegetable, updateVegetableDto);

    await vegetable.save({ validateModifiedOnly: true });

    return vegetable.view();
  }

  async remove(id: string) {
    const vegetable = await this.vegetableModel.findById(id);

    if (!vegetable) return null;

    await vegetable.deleteOne();

    return {
      message: 'Vegetable deleted successfully',
    };
  }
}
