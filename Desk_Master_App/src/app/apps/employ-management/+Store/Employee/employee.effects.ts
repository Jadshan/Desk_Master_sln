import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployService } from '../../service/employ.service';
import {
  addEmployee,
  addEmployeeData,
  addEmployeeDataSuccess,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  loadEmployee,
  loadEmployeeData,
  loadEmployeeDataSuccess,
  loadEmployeeSuccess,
  setInterviewers,
  updateEmployee,
  updateEmployeeSuccess,
} from './employee.action';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import {
  BasicDetails,
  Employee,
  EmployeeData,
  IInterviewer,
} from '../Model/employee.model';
import { showAlert } from '../../../../shared/store/App.action';
//import { deleteBlog } from 'src/app/BlogApp/+Store/blog.action';

@Injectable()
export class employeeEffects {
  constructor(private action$: Actions, private service: EmployService) {}

  _loadEmployeeData = createEffect(() =>
    this.action$.pipe(
      ofType(loadEmployeeData),
      switchMap((action) =>
        this.service.getEmployeeData().pipe(
          switchMap((data) => {
            const basicDetailsList: BasicDetails[] = [];
            const interviewersList: IInterviewer[] = [];

            data.forEach((employ) => {
              basicDetailsList.push(employ.basicDetails);
            });

            basicDetailsList.forEach((employ) => {
              if (employ.role === 'SE' || employ.role === 'SSE') {
                interviewersList.push({
                  employeeId: employ.id,
                  name: employ.firstName,
                  role: employ.role,
                });
              }
            });

            return of(
              loadEmployeeDataSuccess({
                employDataList: data,
                basicDetailsList: basicDetailsList,
              }),
              setInterviewers({ interviewersList: interviewersList })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Loading failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );

  _addEmployData = createEffect(() =>
    this.action$.pipe(
      ofType(addEmployeeData),
      switchMap((action) =>
        this.service.saveEmployeeData(action.employData).pipe(
          switchMap((data) =>
            of(
              addEmployeeDataSuccess({ employData: data as EmployeeData }),
              showAlert({
                message: 'Your Details added successfully',
                alertType: 'success',
              })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Adding failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );

  _loadEmployee = createEffect(() =>
    this.action$.pipe(
      ofType(loadEmployee),
      exhaustMap((action) => {
        return this.service.loadEmployee().pipe(
          map((data) => {
            return loadEmployeeSuccess({ employList: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Loading failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _addEmploy = createEffect(() =>
    this.action$.pipe(
      ofType(addEmployee),
      switchMap((action) =>
        this.service.addEmployee(action.employList).pipe(
          switchMap((data) =>
            of(
              addEmployeeSuccess({ employeeList: data as Employee }),
              showAlert({
                message: 'Employ added successfully',
                alertType: 'success',
              })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Adding failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );

  _updateEmploy = createEffect(() =>
    this.action$.pipe(
      ofType(updateEmployee),
      switchMap((action) =>
        this.service.updateEmployee(action.employList).pipe(
          switchMap((data) =>
            of(
              updateEmployeeSuccess({ employList: action.employList }),
              showAlert({
                message: 'Employ updated successfully',
                alertType: 'success',
              })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Updating failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );

  _deleteEmploy = createEffect(() =>
    this.action$.pipe(
      ofType(deleteEmployee),
      switchMap((action) =>
        this.service.deleteEmployee(action.employId).pipe(
          switchMap(() =>
            of(
              deleteEmployeeSuccess({ employId: action.employId }),
              showAlert({
                message: 'Employ deleted successfully',
                alertType: 'success',
              })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Updating failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );
}
