import { Injectable, Type } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { emptyAction, showAlert } from './App.action';
import { Route } from '@angular/router';

import * as fromActions from './PopUp/popup.action';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable()
export class AppEffects {
  constructor(
    private action$: Actions,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  _showAlert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.alertType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  openDialog$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromActions.OpenDialog),
      switchMap((action) =>
        of(this.matDialog.open(action.component, action.config))
      ),
      map((dialogRef: MatDialogRef<any>) =>
        fromActions.OpenDialogSuccess({ dialogRef })
      )
    )
  );

  showSnackBarAlert(message: string, alertType: string) {
    let _class = alertType == 'success' ? 'green-snackbar' : 'red-snackbar';
    return this._snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [_class],
      duration: 3000,
    });
  }
}
