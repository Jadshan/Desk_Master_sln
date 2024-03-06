import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, EmployeeData } from '../+Store/Model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployService {
  // url: string = 'http://localhost:3000/associate';
  url: string = 'https://localhost:7051/api/EmployAPI';
  baseUrl: string = 'http://localhost:5019/api/EmployeeFullView';
  constructor(private http: HttpClient) {}
  loadEmployee() {
    return this.http.get<Employee[]>(this.url);
  }
  addEmployee(employList: Employee) {
    return this.http.post(this.url, employList);
  }

  updateEmployee(employList: Employee) {
    return this.http.put(this.url + '/' + employList.id, employList);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  ///////===========Employee Registration=========///////////

  getEmployeeData() {
    return this.http.get<EmployeeData[]>(this.baseUrl);
  }
  saveEmployeeData(employeeData: EmployeeData) {
    return this.http.post(this.baseUrl, employeeData);
  }
}
