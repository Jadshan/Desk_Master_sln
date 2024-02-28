import { createReducer, on } from '@ngrx/store';

import { loadSpinner } from './App.action';
import { GlobalState } from './Global.state';

const _appReducer = createReducer(
  GlobalState,
  on(loadSpinner, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  })
);
export function AppReducer(state: any, action: any) {
  return _appReducer(state, action);
}
