import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EmployService } from '../../../service/employ.service';
import {
  BankDetails,
  EmployeeData,
  Experience,
  Skills,
} from '../../../+Store/Model/employee.model';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../../../../shared/store/AppState.Model';
import { addEmployeeData } from '../../../+Store/Employee/employee.action';

@Component({
  selector: 'app-employ-data-entry',
  templateUrl: './employ-data-entry.component.html',
  styleUrls: ['./employ-data-entry.component.css'],
})
export class EmployDataEntryComponent implements OnInit {
  empRegForm!: FormGroup;
  isLinear = true;
  isSameAddress = false;
  employeeData = new EmployeeData();
  submittedEmployeeData = new EmployeeData();
  proficiencyList = ['Beginner', 'Intermediate', 'Advanced'];
  designationList = ['jaffna', 'colombo'];
  roleList = ['SE', 'ASE', 'SSE', 'QA', 'AQA'];

  constructor(
    private FB: FormBuilder,
    private service: EmployService,
    private store: Store<AppStateModel>
  ) {}

  ngOnInit(): void {
    this.employeeData = new EmployeeData();
    this.buildForm();
    this.service.getEmployeeData().subscribe((data) => {
      console.log(data);
    });
  }

  buildForm(): void {
    this.empRegForm = this.FB.group({
      basicDetails: this.FB.group({
        firstName: this.FB.control(''),
        secondName: this.FB.control(''),
        email: this.FB.control(''),
        designation: this.FB.control(''),
        role: this.FB.control(''),
        contactNo: this.FB.control(''),
        alternativeContactNo: this.FB.control(''),
        personalEmail: this.FB.control(''),
        experience: this.FB.group({
          totalYears: 0,
          totalMonths: 0,
        }),
        Address: this.FB.group({
          currentAddress: this.FB.group({
            city: this.FB.control(''),
            state: this.FB.control(''),
            pinCode: this.FB.control(''),
            address: this.FB.control(''),
          }),
          permanentAddress: this.FB.group({
            city: this.FB.control(''),
            state: this.FB.control(''),
            pinCode: this.FB.control(''),
            address: this.FB.control(''),
          }),
        }),
      }),
      skillObj: this.FB.group({
        skill: this.FB.control(''),
        proficiency: this.proficiencyList[0],
        experience: this.FB.control(''),
        version: this.FB.control(''),
        certificationFile: this.FB.control(''),
      }),
      ExperienceObj: this.FB.group({
        company: this.FB.control(''),
        startDate: this.FB.control(''),
        endDate: this.FB.control(''),
        designation: this.FB.control(''),
        project: this.FB.control(''),
      }),
      ExperienceArr: this.FB.array([]),
      bankDetails: this.FB.group({
        bankName: this.FB.control(''),
        branch: this.FB.control(''),
        accountNo: this.FB.control(''),
        accountType: this.FB.control(''),
        accountHolderName: this.FB.control(''),
      }),
    });
  }

  copyCurrentAddressToPermanent(): void {
    if (this.isSameAddress) {
      this.permanentAddressForm.patchValue(this.currentAddressForm.value);
    } else {
      this.permanentAddressForm.reset();
    }
  }

  onNext(): void {
    console.log(this.empRegForm.value);
  }

  onSubmit(): void {
    if (this.empRegForm.valid) {
      this.submittedEmployeeData = {
        basicDetails: {
          id: 0,
          firstName: this.basicDetailForm.value.firstName,
          secondName: this.basicDetailForm.value.secondName,
          email: this.basicDetailForm.value.email,
          designation: this.basicDetailForm.value.designation,
          role: this.basicDetailForm.value.role,
          contactNo: this.basicDetailForm.value.contactNo,
          alternativeContactNo: this.basicDetailForm.value.alternativeContactNo,
          personalEmail: this.basicDetailForm.value.personalEmail,
          totalYears: this.experienceDetailsForm.value.totalYears,
          totalMonths: this.experienceDetailsForm.value.totalMonths,
          currentAddress: { ...this.currentAddressForm.value },
          permanentAddress: { ...this.permanentAddressForm.value },
        },
        skillList: [...this.employeeData.skillList],
        experienceList: [...this.employeeData.experienceList],
        bankDetailsList: [...this.employeeData.bankDetailsList],
      };
      console.log(this.submittedEmployeeData);
    }
  }

  onConfirm(): void {
    this.store.dispatch(
      addEmployeeData({ employData: this.submittedEmployeeData })
    );
    // this.service
    //   .saveEmployeeData(this.submittedEmployeeData)
    //   .subscribe((res) => {
    //     console.log(res);
    //     alert('added success');
    //   });
  }

  get basicDetailForm(): FormGroup {
    return this.empRegForm.get('basicDetails') as FormGroup;
  }

  get experienceDetailsForm(): FormGroup {
    return this.basicDetailForm.get('experience') as FormGroup;
  }

  get currentAddressForm(): FormGroup {
    return (this.basicDetailForm.get('Address') as FormGroup).get(
      'currentAddress'
    ) as FormGroup;
  }

  get permanentAddressForm(): FormGroup {
    return (this.basicDetailForm.get('Address') as FormGroup).get(
      'permanentAddress'
    ) as FormGroup;
  }

  get bankDetailsForm(): FormGroup {
    return this.empRegForm.get('bankDetails') as FormGroup;
  }
  get skillsForm() {
    return this.empRegForm.get('skillObj') as FormGroup;
  }
  get experienceForm() {
    return this.empRegForm.get('ExperienceObj') as FormGroup;
  }

  addExp(): void {
    const experienceObj: Experience = {
      company: '',
      startDate: '',
      endDate: '',
      designation: '',
      project: '',
    };
    this.employeeData.experienceList.push(experienceObj);
  }

  onPushSkill(): void {
    const skillFormGroup = this.empRegForm.get('skillObj') as FormGroup;
    const experienceObj: Skills = {
      skill: skillFormGroup.get('skill')?.value || '',
      proficiency: skillFormGroup.get('proficiency')?.value || '',
      experience: skillFormGroup.get('experience')?.value || '',
      version: skillFormGroup.get('version')?.value || '',
      certificationFile: skillFormGroup.get('project')?.value || '',
    };

    this.employeeData.skillList.push(experienceObj);
    console.log(this.employeeData.skillList);

    this.empRegForm.get('skillObj')?.reset();
  }

  onPushExperience(): void {
    const experienceFormGroup = this.empRegForm.get(
      'ExperienceObj'
    ) as FormGroup;
    const experienceObj: Experience = {
      company: experienceFormGroup.get('company')?.value || '',
      startDate: experienceFormGroup.get('startDate')?.value || '',
      endDate: experienceFormGroup.get('endDate')?.value || '',
      designation: experienceFormGroup.get('designation')?.value || '',
      project: experienceFormGroup.get('project')?.value || '',
    };
    (this.empRegForm.get('ExperienceArr') as FormArray).push(
      this.FB.group(experienceObj)
    );
    this.employeeData.experienceList.push(experienceObj);
    console.log(this.employeeData.experienceList);

    this.empRegForm.get('ExperienceObj')?.reset();
  }

  onPushBank() {
    const _bankDetail: BankDetails = { ...this.bankDetailsForm.value };
    this.employeeData.bankDetailsList.push(_bankDetail);
    console.log(this.employeeData.bankDetailsList);
  }
  onAddSkill(): void {
    const skillObj: Skills = {
      skill: '',
      experience: '',
      version: '',
      proficiency: '',
      certificationFile: '',
    };
    this.employeeData.skillList.unshift(skillObj);
  }
}
