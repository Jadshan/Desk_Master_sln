import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalStateModel } from './GlobalState.Model';

const getAppState = createFeatureSelector<GlobalStateModel>('app');

export const getSpinnerState = createSelector(getAppState, (state) => {
  return state.isLoading;
});
