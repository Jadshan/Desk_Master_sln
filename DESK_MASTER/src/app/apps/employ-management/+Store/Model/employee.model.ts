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

export class EmployeeModel {
  employeeList: Employee[];
  employObj: Employee | undefined;
  errorMessage: string;

  constructor(){
    this.employeeList = [];
    this.errorMessage = '';
    this.employObj = undefined;
  }
}
