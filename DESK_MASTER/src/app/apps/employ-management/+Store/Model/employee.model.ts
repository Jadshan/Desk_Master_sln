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

export interface EmployeeData {
  empName: string;
  position: string;
  salary: 0;
  contactDetails: {
    address: string;
    phoneNo: string;
    email: string;
  };
  bankDetails: {
    bankName: string;
    branch: string;
    accountNo: string;
  };
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
