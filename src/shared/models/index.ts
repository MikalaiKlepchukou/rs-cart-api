import { Request } from 'express';

import { User } from '../../database/models/user.model';

export interface AppRequest extends Request {
  user?: User
}
