import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userCredential } from '../../+Store/user.model';
import { Store } from '@ngrx/store';

import { beginLogin } from '../../+Store/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private FB: FormBuilder, private store: Store) {}
  loginForm = this.FB.group({
    userName: this.FB.control('', Validators.required),
    password: this.FB.control('', Validators.required),
  });

  ProceedLogin() {
    if (this.loginForm.valid) {
      const _loggedInUser: userCredential = {
        username: this.loginForm.value.userName as string,
        password: this.loginForm.value.password as string,
      };
      this.store.dispatch(beginLogin({ userList: _loggedInUser }));
    }
  }
  resetLogin() {}
}
