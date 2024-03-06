import { createAction, props } from '@ngrx/store';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customChange = createAction(
  'customChange',
  props<{ value: number; action: string }>()
);
export const selectCalculationType = createAction(
  'selectCalculationType',
  props<{ calculationType: string }>()
);
