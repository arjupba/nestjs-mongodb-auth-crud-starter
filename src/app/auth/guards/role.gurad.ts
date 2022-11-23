import { RoleEnum } from '../../users/entities/user.entity';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

const RoleGuard = (role: RoleEnum, self = false): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (self && request.params.id == 'self') {
        return true;
      }

      return user?.roles.includes(role) || self;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
