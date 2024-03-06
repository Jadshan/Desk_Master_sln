import { createReducer, on } from '@ngrx/store';
import { authState } from './user.state';
import {
  beginLoginSuccess,
  duplicateUserSuccess,
  fetchMenusSuccess,
} from './user.action';

const _authReducer = createReducer(
  authState,
  on(duplicateUserSuccess, (state, action) => {
    return { ...state, isDuplicate: action.isDuplicate };
  }),
  on(beginLoginSuccess, (state, action) => {
    return { ...state, isLoggedIn: action.isLoggedIn };
  }),
  on(fetchMenusSuccess, (state, action) => {
    return { ...state, authMenuList: action.menusList };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
