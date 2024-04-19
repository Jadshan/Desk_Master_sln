import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { UserService } from '../service/user.service';
import {
  addUser,
  addUserSuccess,
  deleteUser,
  deleteUserSuccess,
  loadUser,
  loadUserSuccess,
  updateUser,
  updateUserSuccess,
} from './user.action';
import { user } from './user.model';
import { Update } from '@ngrx/entity';
import { showAlert } from '../../../shared/store/App.action';
//import { deleteBlog } from 'src/app/BlogApp/+Store/blog.action';

@Injectable()
export class userEffects {
  constructor(private action$: Actions, private service: UserService) {}
  _loadUser = createEffect(() =>
    this.action$.pipe(
      ofType(loadUser),
      exhaustMap((action) => {
        return this.service.loadUser().pipe(
          map((data) => {
            return loadUserSuccess({ userList: data });
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
      ofType(addUser),
      switchMap((action) =>
        this.service.addUser(action.userList).pipe(
          switchMap((data) =>
            of(
              addUserSuccess({ userList: data as user }),
              showAlert({
                message: 'User added successfully',
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
      ofType(updateUser),
      switchMap((action) => {
        return this.service.updateUser(action.userList).pipe(
          switchMap((data) => {
            const updateUser: Update<user> = {
              id: action.userList.id,
              changes: action.userList,
            };
            return of(
              updateUserSuccess({ userList: updateUser }),
              showAlert({
                message: 'Employ updated successfully',
                alertType: 'success',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Updating failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteEmploy = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.service.deleteUser(action.userId).pipe(
          switchMap(() =>
            of(
              deleteUserSuccess({ userId: action.userId }),
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
