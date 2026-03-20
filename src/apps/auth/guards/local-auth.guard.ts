import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validateOrReject } from 'class-validator';

import { LoginDto } from '@apps/auth/dto/login.dto';

@Injectable()
export class ValidatedLocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any) {
    const req = context.switchToHttp().getRequest();
    const login = plainToInstance(LoginDto, req.body ?? {});

    try {
      await validateOrReject(login, {
        forbidNonWhitelisted: true,
        whitelist: true,
      });
    } catch (errs) {
      const errors = (errs as ValidationError[]).flatMap((err) =>
        Object.values(err.constraints ?? {}),
      );

      throw new BadRequestException(errors.length ? errors : 'Validation failed');
    }

    req.body = login;

    return super.canActivate(context) as any;
  }
}
