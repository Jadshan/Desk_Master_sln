export interface employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  employeeGroup: string;
  status: boolean;
}

export interface employeeModel {
  employList: employee[];
  employObj: employee;
  errorMessage: '';
}
