import { CanActivate, ExecutionContext, Inject, Type, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '@apps/auth/guards/jwt.auth.guard';
import { RoleEnum } from '@apps/users/domain/user.type';

const RoleGuard = (requiredRole: RoleEnum): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) return true;

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return user?.activeRole === requiredRole;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
