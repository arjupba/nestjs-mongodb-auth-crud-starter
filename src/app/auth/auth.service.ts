import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { RoleEnum, User } from '@apps/users/domain/user.type';
import { UsersService } from '@apps/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);

    if (!user) {
      return {
        message: 'User not found',
        user: null,
      };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return {
        message: 'Wrong password',
        user: null,
      };
    }

    return {
      message: null,
      user: user.view(),
    };
  }

  async findUser(userId: string) {
    const user = await this.usersService.findOne(userId);

    return user;
  }

  async login(user: User, role: RoleEnum) {
    const payload = { id: user.id, role };

    return {
      access_token: this.jwtService.sign(payload),
      message: 'Login was a success',
      user,
    };
  }

  async register(body: any) {
    try {
      const user = await this.usersService.register(body);
      const payload = { id: user.id, role: RoleEnum.User };

      return {
        access_token: this.jwtService.sign(payload),
        message: 'Login was a success',
        user,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`User already registered with mail id ${body.email}`);
      }

      throw error;
    }
  }
}
