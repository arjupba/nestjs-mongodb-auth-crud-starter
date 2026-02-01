import { Request as Req } from 'express';

import { User } from '@apps/users/domain/user.type';

export interface AuthenticatedRequest extends Req {
  user: User;
}
