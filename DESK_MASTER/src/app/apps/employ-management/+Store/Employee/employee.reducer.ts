import { createReducer, on } from '@ngrx/store';
import { EmployeeState } from './employee.state';
import {
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  loadEmployeeSuccess,
  updateEmployeeSuccess,
} from './employee.action';
import { employee } from '../Model/employee.model';

const _employeeReducer = createReducer(
  EmployeeState,
  on(loadEmployeeSuccess, (state, action) => {
    return {
      ...state,
      employList: [...action.employList],
    };
  }),
  on(addEmployeeSuccess, (state, action) => {
    const _employ = { ...action.employList };
    return {
      ...state,
      employList: [...state.employList, _employ],
    };
  }),
  on(updateEmployeeSuccess, (state, action) => {
    const _employ = { ...action.employList };
    const updatedEmploy = state.employList.map((employ) => {
      return employ.id === _employ.id ? _employ : employ;
    });
    return {
      ...state,
      employList: updatedEmploy,
    };
  }),
  on(deleteEmployeeSuccess, (state, action) => {
    const updatedEmploy = state.employList.filter((data: employee) => {
      return data.id !== action.employId;
    });
    return {
      ...state,
      employList: updatedEmploy,
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
