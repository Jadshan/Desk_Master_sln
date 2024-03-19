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
  id: number;
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
  basicDetails: BasicDetails = {
    id: 0,
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
  skillList: Skills[] = [];
  experienceList: Experience[] = [];
  bankDetailsList: BankDetails[] = [];
  basicDetailsList?: BasicDetails[] = [];
  interviewersList?: IInterviewer[] = [];
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
  employeeList: Employee[] = [];
  employObj?: Employee;
  errorMessage: string = '';

  constructor() {}
}

export interface IInterviewer {
  interviewerId: number;
  name: string;
  role: string;
}
