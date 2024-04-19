import { createFeatureSelector, createSelector } from '@ngrx/store';

import { user, userModel } from './user.model';
import { userAdaptor } from './user.state';

const getUserState = createFeatureSelector<userModel>('user');

const userSelector = userAdaptor.getSelectors();

export const getUserList = createSelector(getUserState, userSelector.selectAll);

const selectedEntities = createSelector(
  getUserState,
  userSelector.selectEntities
);
export const getUserById = (userId: number) =>
  createSelector(selectedEntities, (state) => state[userId]);
