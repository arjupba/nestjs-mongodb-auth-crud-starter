import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);

    if (!user) {
      return { user: null, message: 'User not found' };
    }

    const isPasswordMatch = await bcrypt.compare(pass, user.password);

    if (user && isPasswordMatch) {
      delete user.password;

      return { user, message: null };
    } else {
      return { user: null, message: 'Wrong password' };
    }
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
      message: 'Login was a success',
    };
  }

  async findUser(userId: string) {
    const user = await this.usersService.findOne(userId);

    return user;
  }
}
