import { createReducer, on } from '@ngrx/store';
import { EmployeeDataState, EmployeeState } from './employee.state';
import {
  addEmployeeDataSuccess,
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  loadEmployeeDataSuccess,
  loadEmployeeSuccess,
  setInterviewers,
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

const _employeeDataReducer = createReducer(
  EmployeeDataState,

  on(loadEmployeeDataSuccess, (state, action) => {
    return {
      ...state,
      basicDetailsList: [...action.basicDetailsList],
    };
  }),
  on(setInterviewers, (state, action) => {
    return {
      ...state,
      interviewersList: [...action.interviewersList],
    };
  }),
  on(addEmployeeDataSuccess, (state, action) => {
    const _employData = { ...action.employData.basicDetails };
    return {
      ...state,
      basicDetailsList: state.basicDetailsList
        ? [...state.basicDetailsList, _employData]
        : [_employData],
    };
  })
);

export function employeeDataReducer(state: any, action: any) {
  return _employeeDataReducer(state, action);
}
