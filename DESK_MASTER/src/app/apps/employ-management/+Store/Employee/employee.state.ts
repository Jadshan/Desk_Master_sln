import { employeeModel } from '../Model/employee.model';

export const EmployeeState: employeeModel = {
  employList: [],
  errorMessage: '',
  employObj: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: '',
    address: '',
    employeeGroup: '',
    status: true,
  },
};
