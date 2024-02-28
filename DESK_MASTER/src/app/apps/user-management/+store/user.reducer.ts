import { createReducer, on } from '@ngrx/store';
import { UserState, userAdaptor } from './user.state';
import {
  addUserSuccess,
  deleteUserSuccess,
  loadUserSuccess,
  updateUserSuccess,
} from './user.action';
import { user } from './user.model';

const _userReducer = createReducer(
  UserState,
  on(loadUserSuccess, (state, action) => {
    return userAdaptor.setAll(action.userList, state);
  }),
  on(addUserSuccess, (state, action) => {
    const _maxId = Math.max(...state.ids.map((item) => item as number));
    const _userInput = { ...action.userList };
    _userInput.id = _maxId + 1;
    return userAdaptor.addOne(_userInput, state);
  }),
  on(updateUserSuccess, (state, action) => {
    return userAdaptor.updateOne(action.userList, state);
  }),
  on(deleteUserSuccess, (state, action) => {
    return userAdaptor.removeOne(action.userId, state);
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
