import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  roleAccess,
  user,
  userCredential,
  userInfo,
} from '../+Store/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/user';
  roleUrl: string = 'http://localhost:3000/roleaccess';
  // url: string = 'https://localhost:7051/api/EmployAPI';

  constructor(private http: HttpClient) {}

  registerUser(userList: user) {
    return this.http.post(this.url, userList);
  }

  login(userList: userCredential): Observable<userInfo[]> {
    return this.http.get<userInfo[]>(
      this.url +
        '?username=' +
        userList.username +
        '&password=' +
        userList.password
    );
  }

  duplicateUser(userName: string) {
    return this.http.get<userInfo[]>(this.url + '?username=' + userName);
  }

  fetchMenuByRole(role: string): Observable<roleAccess[]> {
    return this.http.get<roleAccess[]>(this.roleUrl + '?role=' + role);
  }

  SetUserToLocalStorage(userData: userInfo) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  SetAuthMenuToLocalStorage(menuData: roleAccess['menu'][]) {
    localStorage.setItem('menuData', JSON.stringify(menuData));
  }
  GetUserDataFromStorage(storageName: string) {
    let _obj: userInfo = {
      id: '',
      username: '',
      email: '',
      name: '',
      role: '',
      status: false,
    };
    if (localStorage.getItem(storageName) != null) {
      let jsonString = localStorage.getItem(storageName) as string;
      _obj = JSON.parse(jsonString);
      return _obj;
    } else {
      return _obj;
    }
  }
}
