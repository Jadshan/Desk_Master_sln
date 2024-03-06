import { createFeatureSelector, createSelector } from '@ngrx/store';
import { counterModel } from './counter.model';

export const getCounterState = createFeatureSelector<counterModel>('counter');

export const getCounter = createSelector(getCounterState, (state) => {
  return state.counter;
});

export const getCalculationType = createSelector(getCounterState, (state) => {
  return state.getCalculationType;
});
