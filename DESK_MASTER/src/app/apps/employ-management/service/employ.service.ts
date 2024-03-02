import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../+Store/Model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployService {
  // url: string = 'http://localhost:3000/associate';
  url: string = 'https://localhost:7051/api/EmployAPI';

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
}
