import { Body, Controller, ForbiddenException, Post, Request } from '@nestjs/common';

import { AuthService } from '@apps/auth/auth.service';
import type { AuthenticatedRequest } from '@apps/auth/domain/auth.type';
import { LoginDto } from '@apps/auth/dto/login.dto';
import { RegisterUserDto } from '@apps/auth/dto/register-user.dto';
import { Authenticate, Public } from '@apps/auth/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Authenticate()
  async login(@Request() req: AuthenticatedRequest, @Body() login: LoginDto) {
    const user = req.user;

    if (!user.roles.includes(login.role)) {
      throw new ForbiddenException('Role not allowed');
    }

    return this.authService.login(user, login.role);
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }
}
