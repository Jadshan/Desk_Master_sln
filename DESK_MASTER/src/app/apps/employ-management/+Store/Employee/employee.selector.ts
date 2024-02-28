import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employee, employeeModel } from '../Model/employee.model';

const getEmployState = createFeatureSelector<employeeModel>('employ');

export const getEmployList = createSelector(getEmployState, (state) => {
  return state.employList;
});

export const getEmployById = (employId: number) =>
  createSelector(getEmployState, (state) => {
    return state.employList.find(
      (employ: employee) => employ.id === employId
    ) as employee;
  });
