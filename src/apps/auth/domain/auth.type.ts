import { Request as Req } from 'express';

import { RoleEnum, User } from '@apps/users/domain/user.type';

export type AuthorizedUser = User & { activeRole: RoleEnum };

export interface AuthenticatedRequest extends Req {
  user: AuthorizedUser;
}
