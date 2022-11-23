import {
  Inject,
  Injectable,
  forwardRef,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);

    try {
      const user = await createUser.save();

      return this.authService.login(user.view());
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `User already registered with mail id ${createUserDto.email}`,
        );
      }

      throw error;
    }
  }

  async findAll(query, select, cursor) {
    const users = await this.userModel.find(query, select, cursor).exec();

    return users.map((user) => user.view());
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();

    return user?.view();
  }

  async findOneByUserName(userName) {
    const user = await this.userModel.findOne({ email: userName }).exec();

    return user?.view(true);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (user) {
      const updatedUser = await Object.assign(user, {
        ...updateUserDto,
        roles: updateUserDto.roles?.length ? updateUserDto.roles : user.roles,
      }).save();

      return updatedUser.view();
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (user) {
      await user.remove();

      return { ok: true, message: `User deleted ${id}` };
    }
  }
}
