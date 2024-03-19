import { createAction, props } from '@ngrx/store';
import {
  BasicDetails,
  Employee,
  EmployeeData,
  IInterviewer,
} from '../Model/employee.model';

export enum actionTypes {
  LOAD_EMPLOYEE = 'LOAD_EMPLOYEE',
  LOAD_EMPLOYEE_SUCCESS = 'LOAD_EMPLOYEE_SUCCESS',
  LOAD_EMPLOYEE_DATA = 'LOAD_EMPLOYEE_DATA',
  LOAD_EMPLOYEE_DATA_SUCCESS = 'LOAD_EMPLOYEE_DATA_SUCCESS',
  SET_INTERVIEWERS = 'SET_INTERVIEWERS',
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE_DATA = 'ADD_EMPLOYEE_DATA',
  ADD_EMPLOYEE_DATA_SUCCESS = 'ADD_EMPLOYEE_DATA_SUCCESS',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS',
}

export const loadEmployeeData = createAction(actionTypes.LOAD_EMPLOYEE_DATA);
export const loadEmployeeDataSuccess = createAction(
  actionTypes.LOAD_EMPLOYEE_DATA_SUCCESS,
  props<{ employDataList: EmployeeData[]; basicDetailsList: BasicDetails[] }>()
);
export const setInterviewers = createAction(
  actionTypes.SET_INTERVIEWERS,
  props<{ interviewersList: IInterviewer[] }>()
);
export const addEmployeeData = createAction(
  actionTypes.ADD_EMPLOYEE_DATA,
  props<{ employData: EmployeeData }>()
);
export const addEmployeeDataSuccess = createAction(
  actionTypes.ADD_EMPLOYEE_DATA_SUCCESS,
  props<{ employData: EmployeeData }>()
);

export const loadEmployee = createAction(actionTypes.LOAD_EMPLOYEE);
export const loadEmployeeSuccess = createAction(
  actionTypes.LOAD_EMPLOYEE_SUCCESS,
  props<{ employList: Employee[] }>()
);
export const addEmployee = createAction(
  actionTypes.ADD_EMPLOYEE,
  props<{ employList: Employee }>()
);
export const addEmployeeSuccess = createAction(
  actionTypes.ADD_EMPLOYEE_SUCCESS,
  props<{ employeeList: Employee }>()
);
export const updateEmployee = createAction(
  actionTypes.UPDATE_EMPLOYEE,
  props<{ employList: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  actionTypes.UPDATE_EMPLOYEE_SUCCESS,
  props<{ employList: Employee }>()
);
export const deleteEmployee = createAction(
  actionTypes.DELETE_EMPLOYEE,
  props<{ employId: number }>()
);
export const deleteEmployeeSuccess = createAction(
  actionTypes.DELETE_EMPLOYEE_SUCCESS,
  props<{ employId: number }>()
);
