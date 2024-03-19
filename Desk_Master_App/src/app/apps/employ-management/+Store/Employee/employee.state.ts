import { EmployeeData, EmployeeModel } from '../Model/employee.model';

export const EmployeeState: EmployeeModel = {
  employeeList: [],
  employObj: undefined,
  errorMessage: '',
};
export const EmployeeDataState: EmployeeData = {
  basicDetails: {
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
  },
  skillList: [],
  experienceList: [],
  bankDetailsList: [],
  basicDetailsList: [],
  interviewersList: [],
};
