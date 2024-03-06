import { EntityState } from '@ngrx/entity';

export interface user {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  status: boolean;
}

export interface userCredential {
  username: string;
  password: string;
}

export interface userInfo {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: boolean;
}

export interface roleAccess {
  role: string;
  menu: string;
}

export interface menu {
  code: string;
  menu: string;
}

export interface userModel extends EntityState<user> {
  isDuplicate: boolean;
  isLoggedIn: boolean;
  authMenuList: roleAccess['menu'][];
}
