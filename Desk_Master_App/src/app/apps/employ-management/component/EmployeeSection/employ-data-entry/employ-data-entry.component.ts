import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EmployeeData,
  Experience,
  Skills,
} from '../../../+Store/Model/employee.model';
import { EmployService } from '../../../service/employ.service';

@Component({
  selector: 'app-employ-data-entry',
  templateUrl: './employ-data-entry.component.html',
  styleUrls: ['./employ-data-entry.component.css'],
})
export class EmployDataEntryComponent implements OnInit {
  empRegForm!: FormGroup;
  isLinear: boolean = true;
  isSameAddress: boolean = false;
  employeeData!: EmployeeData;
  submittedEmployeeData!: EmployeeData;
  employeeObj: any;
  proficiencyList: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  designationList: string[] = ['jaffna', 'colombo'];
  roleList: string[] = ['SE', 'ASE', 'SSE', 'QA', 'AQA'];
  constructor(private FB: FormBuilder, private service: EmployService) {}
  ngOnInit(): void {
    this.employeeData = new EmployeeData();
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
          totalYears: this.FB.control(0),
          totalMonths: this.FB.control(0),
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
        proficiency: this.FB.control(this.proficiencyList[0]),
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

  copyCurrentAddressToPermanent() {
    if (this.isSameAddress) {
      this.permanentAddressForm.patchValue({
        city: this.currentAddressForm.value.city,
        state: this.currentAddressForm.value.state,
        pinCode: this.currentAddressForm.value.pinCode,
        address: this.currentAddressForm.value.address,
      });
    } else {
      this.permanentAddressForm.reset();
    }
  }

  onTogglePermanentAddress() {
    this.copyCurrentAddressToPermanent();
    // else {
    //   // Optionally clear the permanent address fields if the checkbox is unchecked
    //   const permanentAddressGroup = this.empRegForm.get(
    //     'basicDetails.permanentAddress'
    //   );
    //   if (permanentAddressGroup) {
    //     permanentAddressGroup.reset();
    //   }
    // }
  }

  onNext() {
    console.log(this.empRegForm.value);
  }
  get basicDetailForm() {
    return this.empRegForm.get('basicDetails') as FormGroup;
  }
  get experienceDetailsForm() {
    return this.basicDetailForm.get('experience') as FormGroup;
  }
  get currentAddressForm() {
    return (this.basicDetailForm.get('Address') as FormGroup).get(
      'currentAddress'
    ) as FormGroup;
  }
  get permanentAddressForm() {
    return (this.basicDetailForm.get('Address') as FormGroup).get(
      'permanentAddress'
    ) as FormGroup;
  }

  get bankDetailsForm() {
    return this.empRegForm.get('bankDetails') as FormGroup;
  }
  get skillsForm() {
    return this.empRegForm.get('skillObj') as FormGroup;
  }
  get experienceForm() {
    return this.empRegForm.get('ExperienceObj') as FormGroup;
  }

  addExp() {
    const experienceObj: Experience = {
      company: '',
      startDate: '',
      endDate: '',
      designation: '',
      project: '',
    };
    this.employeeData.experienceArr.push(experienceObj);
  }

  onPushSkill() {
    const skillFormGroup = this.empRegForm.get('skillObj') as FormGroup;
    const experienceObj: Skills = {
      skill: skillFormGroup.get('skill')?.value || '',
      proficiency: skillFormGroup.get('proficiency')?.value || '',
      experience: skillFormGroup.get('experience')?.value || '',
      version: skillFormGroup.get('version')?.value || '',
      certificationFile: skillFormGroup.get('project')?.value || '',
    };

    this.employeeData.skillsArr.push(experienceObj);
    console.log(this.employeeData.skillsArr);

    this.empRegForm.get('skillObj')?.reset();
  }

  onPushExperience() {
    // Push experience from form to ExperienceArr of empRegForm
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
    this.employeeData.experienceArr.push(experienceObj);
    console.log(this.employeeData.experienceArr);

    this.empRegForm.get('ExperienceObj')?.reset();
  }

  onAddSkill() {
    const skillObj: Skills = {
      skill: '',
      experience: '',
      version: '',
      proficiency: '',
      certificationFile: '',
    };
    this.employeeData.skillsArr.unshift(skillObj);
  }

  onSubmit() {
    if (this.empRegForm.valid) {
      this.submittedEmployeeData = {
        basicDetails: {
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
          currentAddress: {
            city: this.currentAddressForm.value.city,
            state: this.currentAddressForm.value.state,
            pinCode: this.currentAddressForm.value.pinCode,
            address: this.currentAddressForm.value.address,
          },
          permanentAddress: {
            city: this.permanentAddressForm.value.city,
            state: this.permanentAddressForm.value.state,
            pinCode: this.permanentAddressForm.value.pinCode,
            address: this.permanentAddressForm.value.address,
          },
        },
        skillsArr: this.employeeData.skillsArr,
        experienceArr: this.employeeData.experienceArr,
        bankDetails: {
          accountHolderName: this.bankDetailsForm.value.accountHolderName,
          bankName: this.bankDetailsForm.value.bankName,
          branch: this.bankDetailsForm.value.branch,
          accountNo: this.bankDetailsForm.value.accountNo,
          accountType: this.bankDetailsForm.value.accountType,
        },
      };
      console.log(this.submittedEmployeeData);
    }
  }

  onConfirm() {
    // this.service
    //   .saveEmployeeData(this.submittedEmployeeData)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
