import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

import { LoginDto } from '@apps/auth/dto/login.dto';
import { Public } from '@apps/auth/guards/jwt.auth.guard';
import { ValidatedLocalAuthGuard } from '@apps/auth/guards/local-auth.guard';
import RoleGuard from '@apps/auth/guards/role.gurad';
import { RoleEnum } from '@apps/users/domain/user.type';

const Authenticate = () =>
  applyDecorators(
    Public(),
    UseGuards(ValidatedLocalAuthGuard),
    ApiBody({ type: LoginDto }),
  );
const Auth = (role?: RoleEnum): ClassDecorator & MethodDecorator => {
  return ((
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    const base = [ApiBearerAuth()];

    if (role) base.push(UseGuards(RoleGuard(role)));

    if (descriptor && role) {
      applyDecorators(
        ...base,
        ApiOperation({ description: `**Required Role:** ${role}` }),
      )(target, propertyKey!, descriptor);

      return;
    }

    applyDecorators(...base)(target);
  }) as any;
};

export { Public, Auth, Authenticate };
