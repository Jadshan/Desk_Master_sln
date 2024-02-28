import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/apps/user-management/+store/user.action';

import { getUserList } from 'src/app/apps/user-management/+store/user.selector';
import { user } from 'src/app/auth/+Store/user.model';

@Component({
  selector: 'app-recruitment-team',
  templateUrl: './recruitment-team.component.html',
  styleUrls: ['./recruitment-team.component.css'],
})
export class RecruitmentTeamComponent implements OnInit {
  userList!: user[];
  // interviewerForm!: FormGroup;
  employeeList: user[] = [];
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.store.select(getUserList).subscribe((list) => {
      this.userList = list;
      if (this.userList.length > 1) {
        this.employeeList = this.userList.filter((user) => {
          return user.role === 'employee';
        });
      }
    });
  }
  onDateSelected($event: MatDatepickerInputEvent<any, any>) {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
