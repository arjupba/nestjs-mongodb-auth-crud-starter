import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryMenType } from 'nestjs-querymen';

import { RegisterUserDto } from '@apps/auth/dto/register-user.dto';
import { UserDocument, UserEntity } from '@apps/users/entities/user.entity';

import { ObjectLiteral } from '@libs/golbal';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    return (await this.userModel.create(registerUserDto)).view();
  }

  async findAll({ query, select, cursor }: QueryMenType) {
    return (await this.userModel.find(query, select, cursor).exec()).map((user) =>
      user.view(),
    );
  }

  async findOne(id: string) {
    return (await this.userModel.findById(id).exec())?.view();
  }

  async update(id: string, updateUserDto: ObjectLiteral) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return null;
    }

    Object.assign(user, updateUserDto);

    await user.save({ validateModifiedOnly: true });

    return user.view();
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return null;
    }

    await user.deleteOne();

    return {
      message: 'User deleted successfully',
    };
  }

  async findOneByUserName(userName: string) {
    return await this.userModel.findOne({ email: userName }).exec();
  }
}
