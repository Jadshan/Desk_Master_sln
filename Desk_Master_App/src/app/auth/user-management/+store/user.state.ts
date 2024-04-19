import { createEntityAdapter } from '@ngrx/entity';
import { user, userModel } from './user.model';

export const userAdaptor = createEntityAdapter<user>();
// export const UserState: userModel = {
//   userList: [],
//   errorMessage: '',
// };

export const UserState: userModel = userAdaptor.getInitialState();
