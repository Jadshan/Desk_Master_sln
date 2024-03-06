import { Type } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export interface PopUpModel {
  isPopupOpen: boolean;
  componentToLoad: Type<any> | null;
  data: any;
  dialogConfig: MatDialogConfig;
}

export const popUpState: PopUpModel = {
  isPopupOpen: false,
  componentToLoad: null,
  data: null,
  dialogConfig: {},
};
