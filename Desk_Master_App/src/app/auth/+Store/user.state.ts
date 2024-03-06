import { createEntityAdapter } from '@ngrx/entity';
import { user, userModel } from './user.model';

export const userAdaptor = createEntityAdapter<user>();

export const authState: userModel = userAdaptor.getInitialState({
  isDuplicate: false,
  isLoggedIn: false,
  authMenuList: [],
});
