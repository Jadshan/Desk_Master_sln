import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { beginRegister, duplicateUser } from '../../+Store/user.action';
import { user } from '../../+Store/user.model';
import { isDuplicateUser } from '../../+Store/user.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  //userForm!: FormGroup;
  constructor(
    private FB: FormBuilder, // @Inject(MAT_DIALOG_DATA) public data: any
    private store: Store
  ) {}
  userForm = this.FB.group(
    {
      username: this.FB.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      password: this.FB.control('', Validators.required),
      confirmPassword: this.FB.control('', Validators.required),
      name: this.FB.control('', Validators.required),
      email: this.FB.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: this.FB.control('', Validators.required),
      gender: this.FB.control('male'),
    },
    { validator: CustomValidators.MatchingPasswords }
  );
  SaveUser() {
    if (this.userForm.valid) {
      const _registerForm: user = {
        name: this.userForm.value.name as string,
        username: this.userForm.value.username as string,
        password: this.userForm.value.password as string,
        email: this.userForm.value.email as string,
        phone: this.userForm.value.phone as string,
        gender: this.userForm.value.gender as string,
        role: 'user',
        status: true,
      };
      this.store.dispatch(beginRegister({ userList: _registerForm }));
      this.userForm.reset();
    }
  }
  ClosePopup() {}

  checkDuplicateUser() {
    const userName = this.userForm.value.username;
    if (userName != '') {
      this.store.dispatch(duplicateUser({ userName: userName }));
      this.store.select(isDuplicateUser).subscribe((isExist) => {
        if (isExist) {
          this.userForm.controls['username'].reset();
        }
      });
    }
  }
}

export class CustomValidators {
  static MatchingPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const currentErrors = control.get('confirmPassword')?.errors || null;
    const confirmControl = control.get('confirmPassword');

    if (confirmControl && password && confirmPassword) {
      if (compare(password, confirmPassword)) {
        confirmControl.setErrors({ ...currentErrors, not_matching: true });
      } else {
        confirmControl.setErrors(currentErrors);
      }
    }

    return null; // or return currentErrors if you want to return the errors
  }
}

function compare(password: string, confirmPassword: string) {
  return password !== confirmPassword && confirmPassword !== '';
}
