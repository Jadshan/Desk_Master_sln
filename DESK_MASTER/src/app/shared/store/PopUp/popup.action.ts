import { createAction, props } from '@ngrx/store';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Type } from '@angular/core';

export const OpenDialog = createAction(
  '[Core dialog] Open dialog',
  props<{ component: Type<any>; config?: MatDialogConfig }>()
);

export const OpenDialogSuccess = createAction(
  '[Core dialog] Open dialog success',
  props<{ dialogRef: MatDialogRef<any> }>()
);
