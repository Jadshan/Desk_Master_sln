import { createAction, props } from '@ngrx/store';

export const SHOW_ALERT = 'SHOW_ALERT';
export const EMPTY_ACTION = 'EMPTY_ACTION';
export const LOAD_SPINNER = 'LOAD_SPINNER';

export const emptyAction = createAction(EMPTY_ACTION);
export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; alertType: string }>()
);
export const loadSpinner = createAction(
  LOAD_SPINNER,
  props<{ isLoading: boolean }>()
);
