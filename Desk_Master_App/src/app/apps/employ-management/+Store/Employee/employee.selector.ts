import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee, EmployeeModel } from '../Model/employee.model';

const getEmployState = createFeatureSelector<EmployeeModel>('employ');

export const getEmployList = createSelector(getEmployState, (state) => {
  return state.employeeList;
});

export const getEmployById = (employId: number) =>
  createSelector(getEmployState, (state) => {
    return state.employeeList.find(
      (employ: Employee) => employ.id === employId
    ) as Employee;
  });
