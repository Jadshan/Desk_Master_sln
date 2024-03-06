import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../+Store/user.selector';
import { UserService } from '../service/user.service';
import { userInfo } from '../+Store/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  let _isLoggedIn: boolean = false;
  const router = inject(Router);
  const userService = inject(UserService);
  const userInfo: userInfo = userService.GetUserDataFromStorage('userData');
  // store.select(isLoggedIn).subscribe((isLoggedIn) => {
  //   _isLoggedIn = isLoggedIn;
  // });
  if (userInfo.username != '' && userInfo.username != null) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
