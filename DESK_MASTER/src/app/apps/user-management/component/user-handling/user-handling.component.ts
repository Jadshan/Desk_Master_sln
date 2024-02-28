import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/AppState.Model';
import { getUserById } from '../../+store/user.selector';
import { user } from '../../+store/user.model';
import { addUser, updateUser } from '../../+store/user.action';

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.css'],
})
export class UserHandlingComponent {
  title: string = '';
  isEdit: boolean = false;
  isRoleChange: boolean = false;

  //userForm!: FormGroup;
  editedUser!: user;
  constructor(
    private dialogRef: MatDialogRef<UserHandlingComponent>,
    private FB: FormBuilder,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.userForm = FB.group({
    //   id: 0,
    //   name: '',
    //   username: FB.control({ value: '', disabled: this.isRoleChange }),
    //   password: '',
    //   email: '',
    //   phone: '',
    //   gender: '',
    //   role: '',
    //   status: false,
    // });
  }
  userForm = this.FB.group({
    id: this.FB.control(0),
    name: this.FB.control('', Validators.required),
    username: this.FB.control(''),
    password: this.FB.control(''),
    email: this.FB.control(''),
    phone: this.FB.control(''),
    gender: this.FB.control(''),
    role: this.FB.control(''),
    status: this.FB.control(false),
  });
  ngOnInit(): void {
    this.title = this.data.title;
    this.isEdit = this.data.isEdit;
    this.isRoleChange = this.data.isRole;
    if (this.data.isEdit || this.isRoleChange) {
      this.store.select(getUserById(this.data.id)).subscribe((_editedUser) => {
        this.editedUser = _editedUser as user;
        this.userForm.setValue({
          id: this.editedUser.id,
          name: this.editedUser.name,
          username: this.editedUser.username,
          password: this.editedUser.password,
          email: this.editedUser.email,
          phone: this.editedUser.phone,
          gender: this.editedUser.gender,
          role: this.editedUser.role,
          status: this.editedUser.status,
        });
      });
    }
    this.userForm;
  }

  SaveUser() {
    if (this.userForm.valid) {
      const _userInput: user = {
        id: this.userForm.value.id as number,
        name: this.userForm.value.name as string,
        username: this.userForm.value.username as string,
        password: this.userForm.value.password as string,
        email: this.userForm.value.email as string,
        phone: this.userForm.value.phone as string,
        gender: this.userForm.value.gender as string,
        role: this.userForm.value.role as string,
        status: this.userForm.value.status as boolean,
      };
      if (this.data.isEdit || (this.data.isRole && this.userForm)) {
        this.store.dispatch(updateUser({ userList: _userInput }));
      } else {
        this.store.dispatch(addUser({ userList: _userInput }));
      }
      this.ClosePopup();
    }
  }

  ClosePopup() {
    this.dialogRef.close();
  }
}
