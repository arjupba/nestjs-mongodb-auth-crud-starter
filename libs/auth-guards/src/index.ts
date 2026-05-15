import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

import { LoginDto } from '@apps/auth/dto/login.dto';
import { RoleEnum } from '@apps/users/domain/user.type';

import { Public } from '@libs/auth-guards/jwt.auth.guard';
import { ValidatedLocalAuthGuard } from '@libs/auth-guards/local-auth.guard';
import RoleGuard from '@libs/auth-guards/role.gurad';

const Authenticate = () =>
  applyDecorators(
    Public(),
    UseGuards(ValidatedLocalAuthGuard),
    ApiBody({ type: LoginDto }),
  );
const Auth = (roles?: RoleEnum[]): ClassDecorator & MethodDecorator => {
  return ((
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    const base = [ApiBearerAuth()];

    if (roles?.length) {
      base.push(UseGuards(RoleGuard(roles)));
    }

    if (descriptor && roles) {
      applyDecorators(
        ...base,
        ApiOperation({ description: `**Required Roles:** ${roles.join(' / ')}` }),
      )(target, propertyKey!, descriptor);

      return;
    }

    applyDecorators(...base)(target);
  }) as any;
};

export { Public, Auth, Authenticate };
