import { createReducer, on } from '@ngrx/store';
import {
  customChange,
  decrement,
  increment,
  reset,
  selectCalculationType,
} from './counter.action';
import { counterState } from './counter.state';

const _counterReducer = createReducer(
  counterState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customChange, (state, action) => {
    return {
      ...state,
      counter:
        action.action == 'add'
          ? state.counter + action.value
          : state.counter - action.value,
    };
  }),
  on(selectCalculationType, (state, action) => {
    return {
      ...state,
      calculationType: action.calculationType,
    };
  })
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
