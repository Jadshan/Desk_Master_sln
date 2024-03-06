import { Component, OnInit } from '@angular/core';
import { EmployService } from '../../../service/employ.service';
import { EmployeeData } from '../../../+Store/Model/employee.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  isExpanded: boolean = false;
  employeeData: EmployeeData[] = [];
  columnsToDisplay: string[] = ['empName', 'position', 'salary'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: EmployeeData | null;
  columnsWithContactDetails: string[] = ['address', 'phoneNo', 'email'];
  columnsWithBankDetails: string[] = ['bankName', 'branch', 'accountNo'];
  constructor(private service: EmployService) {}
  ngOnInit(): void {
    this.service.getEmployeeData().subscribe((data: EmployeeData[]) => {
      console.log(data);
      this.employeeData = data;
    });
  }

  toggle(element: EmployeeData) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.isExpanded = true;
  }
}
