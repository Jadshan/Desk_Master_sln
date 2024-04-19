import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { user } from '../+store/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/user';
  // url: string = 'https://localhost:7051/api/EmployAPI';

  constructor(private http: HttpClient) {}
  loadUser() {
    return this.http.get<user[]>(this.url);
  }
  addUser(userList: user) {
    return this.http.post(this.url, userList);
  }

  updateUser(userList: user) {
    return this.http.put(this.url + '/' + userList.id, userList);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
