import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/AppState.Model';
import { getEmployById } from '../../+Store/Employee/employee.selector';
import {
  addEmployee,
  updateEmployee,
} from '../../+Store/Employee/employee.action';
import { employee } from '../../+Store/Model/employee.model';

@Component({
  selector: 'app-employ-handling',
  templateUrl: './employ-handling.component.html',
  styleUrls: ['./employ-handling.component.css'],
})
export class EmployHandlingComponent implements OnInit {
  title: string = '';
  isEdit: boolean = false;
  employeeForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EmployHandlingComponent>,
    private FB: FormBuilder,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = FB.group({
      id: 0,
      name: '',
      email: '',
      phone: '',
      type: '',
      address: '',
      employeeGroup: '',
      status: false,
    });
  }
  ngOnInit(): void {
    this.title = this.data.title;
    this.isEdit = this.data.isEdit;
    if (this.data.isEdit) {
      this.store
        .select(getEmployById(this.data.id))
        .subscribe((_editedEmploy) => {
          this.employeeForm.setValue({
            id: _editedEmploy.id,
            name: _editedEmploy.name,
            email: _editedEmploy.email,
            phone: _editedEmploy.phone,
            type: _editedEmploy.type,
            address: _editedEmploy.address,
            employeeGroup: _editedEmploy.employeeGroup,
            status: _editedEmploy.status,
          });
        });
    }
    this.employeeForm;
  }

  SaveEmployee() {
    if (this.employeeForm.valid) {
      const _employInput: employee = {
        id: 0,
        name: this.employeeForm.value.name,
        email: this.employeeForm.value.email,
        phone: this.employeeForm.value.phone,
        type: this.employeeForm.value.type,
        address: this.employeeForm.value.address,
        employeeGroup: this.employeeForm.value.employeeGroup,
        status: this.employeeForm.value.status,
      };
      if (this.data.isEdit) {
        _employInput.id = this.employeeForm.value.id;
        this.store.dispatch(updateEmployee({ employList: _employInput }));
      } else {
        this.store.dispatch(addEmployee({ employList: _employInput }));
      }
      this.ClosePopup();
    }
  }

  ClosePopup() {
    this.dialogRef.close();
  }
}
