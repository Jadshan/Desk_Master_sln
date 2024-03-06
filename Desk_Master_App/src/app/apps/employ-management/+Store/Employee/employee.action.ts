import { createAction, props } from '@ngrx/store';
import { Employee } from '../Model/employee.model';

export enum actionTypes {
  LOAD_EMPLOYEE = 'LOAD_EMPLOYEE',
  LOAD_EMPLOYEE_SUCCESS = 'LOAD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS',
}

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
