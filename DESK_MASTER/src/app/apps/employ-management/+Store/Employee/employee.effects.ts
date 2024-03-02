import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployService } from '../../service/employ.service';
import {
  addEmployee,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  loadEmployee,
  loadEmployeeSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from './employee.action';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from 'src/app/shared/store/App.action';
import { Employee } from '../Model/employee.model';
//import { deleteBlog } from 'src/app/BlogApp/+Store/blog.action';

@Injectable()
export class employeeEffects {
  constructor(private action$: Actions, private service: EmployService) {}
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
