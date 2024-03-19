import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee, EmployeeData, EmployeeModel } from '../Model/employee.model';

const getEmployDataState = createFeatureSelector<EmployeeData>('employData');

export const getBasicDetailList = createSelector(
  getEmployDataState,
  (state) => {
    return state.basicDetailsList;
  }
);
export const getInterviewersList = createSelector(
  getEmployDataState,
  (state) => {
    return state.interviewersList;
  }
);

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
