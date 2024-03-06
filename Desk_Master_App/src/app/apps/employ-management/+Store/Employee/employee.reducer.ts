import { createReducer, on } from '@ngrx/store';
import { EmployeeState } from './employee.state';
import {
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  loadEmployeeSuccess,
  updateEmployeeSuccess,
} from './employee.action';
import { Employee } from '../Model/employee.model';

const _employeeReducer = createReducer(
  EmployeeState,
  on(loadEmployeeSuccess, (state, action) => {
    return {
      ...state,
      employeeList: [...action.employList],
    };
  }),
  on(addEmployeeSuccess, (state, action) => {
    const _employ = { ...action.employeeList };
    return {
      ...state,
      employeeList: [...state.employeeList, _employ],
    };
  }),
  on(updateEmployeeSuccess, (state, action) => {
    const _employ = { ...action.employList };
    const updatedEmploy = state.employeeList.map((employ) => {
      return employ.id === _employ.id ? _employ : employ;
    });
    return {
      ...state,
      employeeList: updatedEmploy,
    };
  }),
  on(deleteEmployeeSuccess, (state, action) => {
    const updatedEmploy = state.employeeList.filter((data: Employee) => {
      return data.id !== action.employId;
    });
    return {
      ...state,
      employeeList: updatedEmploy,
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
