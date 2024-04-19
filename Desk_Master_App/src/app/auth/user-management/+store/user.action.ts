import { createAction, props } from '@ngrx/store';
import { user } from './user.model';
import { Update } from '@ngrx/entity';

export enum actionTypes {
  LOAD_USER = 'LOAD_USER',
  LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS',
  ADD_USER = 'ADD_EMPLOYEE',
  ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
  UPDATE_USER = 'UPDATE_EMPLOYEE',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  DELETE_USER = 'DELETE_USER',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
}

export const loadUser = createAction(actionTypes.LOAD_USER);
export const loadUserSuccess = createAction(
  actionTypes.LOAD_USER_SUCCESS,
  props<{ userList: user[] }>()
);
export const addUser = createAction(
  actionTypes.ADD_USER,
  props<{ userList: user }>()
);
export const addUserSuccess = createAction(
  actionTypes.ADD_USER_SUCCESS,
  props<{ userList: user }>()
);
export const updateUser = createAction(
  actionTypes.UPDATE_USER,
  props<{ userList: user }>()
);
export const updateUserSuccess = createAction(
  actionTypes.UPDATE_USER_SUCCESS,
  props<{ userList: Update<user> }>()
);
export const deleteUser = createAction(
  actionTypes.DELETE_USER,
  props<{ userId: number }>()
);
export const deleteUserSuccess = createAction(
  actionTypes.DELETE_USER_SUCCESS,
  props<{ userId: number }>()
);
