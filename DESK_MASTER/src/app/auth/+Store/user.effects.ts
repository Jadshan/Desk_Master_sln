import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from 'src/app/shared/store/App.action';

import {
  beginLogin,
  beginLoginSuccess,
  beginRegister,
  duplicateUser,
  duplicateUserSuccess,
  fetchMenus,
  fetchMenusSuccess,
} from './user.action';

import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { roleAccess, userInfo } from './user.model';
//import { deleteBlog } from 'src/app/BlogApp/+Store/blog.action';

@Injectable()
export class authEffects {
  constructor(
    private action$: Actions,
    private service: UserService,
    private router: Router
  ) {}

  _register = createEffect(() =>
    this.action$.pipe(
      ofType(beginRegister),
      switchMap((action) =>
        this.service.registerUser(action.userList).pipe(
          map((data) => {
            this.router.navigate(['login']);
            return showAlert({
              message: 'Registered successfully',
              alertType: 'success',
            });
          }),
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

  duplicateUser = createEffect(() =>
    this.action$.pipe(
      ofType(duplicateUser),
      switchMap((action) =>
        this.service.duplicateUser(action.userName).pipe(
          switchMap((data) => {
            if (data.length > 0) {
              return of(
                duplicateUserSuccess({ isDuplicate: true }),
                showAlert({ message: 'user already exist.', alertType: 'fail' })
              );
            } else {
              return of(duplicateUserSuccess({ isDuplicate: false }));
            }
          }),
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

  login = createEffect(() =>
    this.action$.pipe(
      ofType(beginLogin),
      switchMap((action) => {
        return this.service.login(action.userList).pipe(
          switchMap((data: userInfo[]) => {
            if (data.length > 0) {
              const _userData = data[0];
              //console.log(data);
              if (_userData.status === true) {
                this.service.SetUserToLocalStorage(_userData);
                this.router.navigate(['']);
                return of(
                  fetchMenus({ role: _userData.role }),
                  beginLoginSuccess({ isLoggedIn: true }),
                  showAlert({
                    message: 'Login successfully',
                    alertType: 'success',
                  })
                );
              } else {
                return of(
                  showAlert({
                    message: 'Login successfully',
                    alertType: 'success',
                  })
                );
              }
            } else {
              return of(
                showAlert({
                  message: 'Invalid Credential',
                  alertType: 'fail',
                })
              );
            }
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Adding failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _fetchMenu = createEffect(() =>
    this.action$.pipe(
      ofType(fetchMenus),
      switchMap((action) => {
        return this.service.fetchMenuByRole(action.role).pipe(
          switchMap((data) => {
            let menusList: roleAccess['menu'][] = [];
            data.map((item) => {
              menusList.push(item.menu);
            });
            this.service.SetAuthMenuToLocalStorage(menusList);

            return of(fetchMenusSuccess({ menusList: menusList }));
          })
        );
      }),
      catchError((_error) =>
        of(
          showAlert({
            message: 'Adding failed - Due to' + _error.message,
            alertType: 'fail',
          })
        )
      )
    )
  );

  // login = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(beginLogin),
  //     switchMap((action) =>
  //        this.service.login(action.userList).pipe(
  //         switchMap((data) => {
  //           if (data.length > 0) {
  //             const _loginUser = data[0];
  //             if (_loginUser.status === true) {
  //               return of(
  //                 beginLoginSuccess({ isLoggedIn: true }),
  //                 this.router.navigate(['']),
  //                 showAlert({
  //                   message: 'Login successfully',
  //                   alertType: 'success',
  //                 })
  //               );
  //             } else {
  //               return of(showAlert({
  //                 message: 'Inactive User',
  //                 alertType: 'fail',
  //               }));
  //             }
  //           } else {
  //             return of(showAlert({
  //               message: 'Invalid Credential',
  //               alertType: 'fail',
  //             });
  //           }
  //         }),
  //         catchError((_error) =>
  //           of(
  //             showAlert({
  //               message: 'Adding failed - Due to' + _error.message,
  //               alertType: 'fail',
  //             })
  //           )
  //         )
  //       );
  //     )
  //   )
  // );
}
