import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { Vegetable, VegetableDocument } from './entities/vegetable.entity';

@Injectable()
export class VegetablesService {
  constructor(
    @InjectModel(Vegetable.name)
    private vegetableModel: Model<VegetableDocument>,
  ) {}

  async create(createVegetableDto: CreateVegetableDto) {
    const createVegetable = new this.vegetableModel(createVegetableDto);

    try {
      const vegetable = await createVegetable.save();

      return vegetable.view();
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: Object, select: Object, cursor: Object) {
    const users = await this.vegetableModel.find(query, select, cursor).exec();

    return users.map((user) => user.view());
  }

  async findOne(id: string) {
    const vegetable = await this.vegetableModel.findOne({ _id: id }).exec();

    return vegetable?.view();
  }

  async update(id: string, updateVegetableDto: UpdateVegetableDto) {
    const vegetable = await this.vegetableModel.findOne({ _id: id }).exec();

    if (vegetable) {
      const updatedVegetable = await Object.assign(
        vegetable,
        updateVegetableDto,
      ).save();

      return updatedVegetable.view();
    }
  }

  async remove(id: string) {
    const vegetable = await this.vegetableModel.findOne({ _id: id }).exec();

    if (vegetable) {
      await vegetable.remove();

      return { ok: true, message: `Vegetable deleted ${id}` };
    }
  }
}
