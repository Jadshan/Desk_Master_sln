import { Component, OnInit } from '@angular/core';
import { EmployService } from '../../../service/employ.service';
import {
  BasicDetails,
  EmployeeData,
} from '../../../+Store/Model/employee.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { getBasicDetailList } from '../../../+Store/Employee/employee.selector';
import { loadEmployeeData } from '../../../+Store/Employee/employee.action';

@Component({
  selector: 'app-admin-view-employ-data',
  templateUrl: './admin-view-employ-data.component.html',
  styleUrls: ['./admin-view-employ-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminViewEmployDataComponent implements OnInit {
  shuffle() {
    throw new Error('Method not implemented.');
  }
  removeColumn() {
    throw new Error('Method not implemented.');
  }
  addColumn() {
    throw new Error('Method not implemented.');
  }
  isExpanded: boolean = false;
  employeeData: BasicDetails[] = [];
  employColumns: string[] = ['firstName', 'role', 'email', 'contactNo'];
  employColumnsToDisplay: string[] = this.employColumns.slice();
  constructor(private service: EmployService, private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadEmployeeData());
    this.store.select(getBasicDetailList).subscribe((list) => {
      this.employeeData = list ? list : [];
      console.log(this.employeeData);
    });
  }
}
