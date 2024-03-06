import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeData } from '../../../+Store/Model/employee.model';
import { EmployService } from '../../../service/employ.service';

@Component({
  selector: 'app-employ-data-entry',
  templateUrl: './employ-data-entry.component.html',
  styleUrls: ['./employ-data-entry.component.css'],
})
export class EmployDataEntryComponent implements OnInit {
  empRegForm!: FormGroup;
  isLinear: boolean = true;
  submittedEmployeeData!: EmployeeData;
  constructor(private FB: FormBuilder, private service: EmployService) {}
  ngOnInit(): void {
    this.empRegForm = this.FB.group({
      basicDetails: this.FB.group({
        firstName: this.FB.control('', Validators.required),
        position: this.FB.control(''),
        salary: this.FB.control(0),
      }),
      contactDetails: this.FB.group({
        address: this.FB.control(''),
        phoneNo: this.FB.control(''),
        email: this.FB.control(''),
      }),
      bankDetails: this.FB.group({
        bankName: this.FB.control(''),
        branch: this.FB.control(''),
        accountNo: this.FB.control(''),
      }),
    });
  }

  get basicDetailForm() {
    return this.empRegForm.get('basicDetails') as FormGroup;
  }
  get contactDetailsForm() {
    return this.empRegForm.get('contactDetails') as FormGroup;
  }
  get bankDetailsForm() {
    return this.empRegForm.get('bankDetails') as FormGroup;
  }

  onSubmit() {
    if (this.empRegForm.valid) {
      this.submittedEmployeeData = {
        empName: this.basicDetailForm.value.firstName,
        position: this.basicDetailForm.value.position,
        salary: this.basicDetailForm.value.salary,
        contactDetails: {
          address: this.contactDetailsForm.value.address,
          phoneNo: this.contactDetailsForm.value.phoneNo,
          email: this.contactDetailsForm.value.email,
        },
        bankDetails: {
          bankName: this.bankDetailsForm.value.bankName,
          branch: this.bankDetailsForm.value.branch,
          accountNo: this.bankDetailsForm.value.accountNo,
        },
      };
    }
  }

  onConfirm() {
    this.service
      .saveEmployeeData(this.submittedEmployeeData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
