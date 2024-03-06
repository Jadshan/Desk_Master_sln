import { createAction, props } from '@ngrx/store';
import { roleAccess, user, userCredential } from './user.model';
import { Update } from '@ngrx/entity';

export enum actionTypes {
  DUPLICATE_USER = 'DUPLICATE_USER',
  DUPLICATE_USER_SUCCESS = 'DUPLICATE_USER_SUCCESS',
  BEGIN_REGISTER = 'BEGIN_REGISTER',
  BEGIN_LOGIN = 'BEGIN_LOGIN',
  BEGIN_LOGIN_SUCCESS = 'BEGIN_LOGIN_SUCCESS',
  FETCH_MENUS = 'FETCH_MENUS',
  FETCH_MENUS_SUCCESS = 'FETCH_MENUS_SUCCESS',
}

export const duplicateUser = createAction(
  actionTypes.DUPLICATE_USER,
  props<{ userName: string }>()
);
export const duplicateUserSuccess = createAction(
  actionTypes.DUPLICATE_USER_SUCCESS,
  props<{ isDuplicate: boolean }>()
);
export const beginRegister = createAction(
  actionTypes.BEGIN_REGISTER,
  props<{ userList: user }>()
);
export const beginLogin = createAction(
  actionTypes.BEGIN_LOGIN,
  props<{ userList: userCredential }>()
);
export const beginLoginSuccess = createAction(
  actionTypes.BEGIN_LOGIN_SUCCESS,
  props<{ isLoggedIn: boolean }>()
);
export const fetchMenus = createAction(
  actionTypes.FETCH_MENUS,
  props<{ role: string }>()
);
export const fetchMenusSuccess = createAction(
  actionTypes.FETCH_MENUS_SUCCESS,
  props<{ menusList: roleAccess['menu'][] }>()
);
