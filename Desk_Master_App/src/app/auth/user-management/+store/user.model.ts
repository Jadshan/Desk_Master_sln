import { EntityState } from '@ngrx/entity';

export interface user {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  status: boolean;
}

export interface userModel extends EntityState<user> {
  // userList: user[];
  // errorMessage: '';
}
