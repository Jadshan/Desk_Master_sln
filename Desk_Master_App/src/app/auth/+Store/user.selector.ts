import { createFeatureSelector, createSelector } from '@ngrx/store';

import { user, userModel } from './user.model';
import { userAdaptor } from './user.state';

const getAuthState = createFeatureSelector<userModel>('auth');

export const isDuplicateUser = createSelector(
  getAuthState,
  (state) => state.isDuplicate
);

export const isLoggedIn = createSelector(
  getAuthState,
  (state) => state.isLoggedIn
);

export const getMenuListSate = createSelector(
  getAuthState,
  (state) => state.authMenuList
);
