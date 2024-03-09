export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  employeeGroup: string;
  status: boolean;
}

export interface BasicDetails {
  firstName: string;
  secondName: string;
  email: string;
  designation: string;
  role: string;
  contactNo: string;
  alternativeContactNo: string;
  personalEmail: string;
  totalYears: number;
  totalMonths: number;
  currentAddress: Address;
  permanentAddress: Address;
}

export interface Address {
  city: string;
  state: string;
  pinCode: string;
  address: string;
}

export class EmployeeData {
  basicDetails: BasicDetails;
  skillsArr: Skills[];
  experienceArr: Experience[];
  bankDetails: BankDetails;

  constructor() {
    this.basicDetails = {
      firstName: '',
      secondName: '',
      email: '',
      designation: '',
      role: '',
      contactNo: '',
      alternativeContactNo: '',
      personalEmail: '',
      totalYears: 0,
      totalMonths: 0,
      currentAddress: {
        city: '',
        state: '',
        pinCode: '',
        address: '',
      },
      permanentAddress: {
        city: '',
        state: '',
        pinCode: '',
        address: '',
      },
    };
    this.skillsArr = [];
    this.experienceArr = [];
    this.bankDetails = {
      accountHolderName: '',
      bankName: '',
      branch: '',
      accountNo: '',
      accountType: '',
    };
  }
}

export interface Skills {
  skill: string;
  proficiency: string;
  experience: string;
  version: string;
  certificationFile: string;
}

export interface Experience {
  company: string;
  startDate: string;
  endDate: string;
  designation: string;
  project: string;
}

export interface BankDetails {
  accountHolderName: string;
  bankName: string;
  branch: string;
  accountNo: string;
  accountType: string;
}

export class EmployeeModel {
  employeeList: Employee[];
  employObj: Employee | undefined;
  errorMessage: string;

  constructor() {
    this.employeeList = [];
    this.errorMessage = '';
    this.employObj = undefined;
  }
}
