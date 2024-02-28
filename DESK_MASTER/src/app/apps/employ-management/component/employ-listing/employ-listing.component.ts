import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployService } from '../../service/employ.service';
import { loadEmployee } from '../../+Store/Employee/employee.action';
import { Store } from '@ngrx/store';
import { employee } from '../../+Store/Model/employee.model';
import { getEmployList } from '../../+Store/Employee/employee.selector';
import { MatDialog } from '@angular/material/dialog';
import { EmployHandlingComponent } from '../employ-handling/employ-handling.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employ-listing',
  templateUrl: './employ-listing.component.html',
  styleUrls: ['./employ-listing.component.css'],
})
export class EmployListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employList!: employee[];
  dataSource: any;
  displayedColumns: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'address',
    'type',
    'group',
    'status',
    'action',
  ];
  constructor(private store: Store, private Dialog: MatDialog) {}
  ngOnInit(): void {
    this.store.dispatch(loadEmployee());
    this.store.select(getEmployList).subscribe((list) => {
      this.employList = list;
      this.dataSource = new MatTableDataSource<employee>(this.employList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  AddEmployee() {
    this.openPopup(0, 'Add New Employee');
  }
  onEdit(id: number) {
    this.openPopup(id, 'Edit Employee', true);
  }
  onDelete(id: number) {}

  openPopup(id: number, title: string, isEdit = false) {
    this.Dialog.open(EmployHandlingComponent, {
      width: '50%',
      height: '800px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        id: id,
        title: title,
        isEdit: isEdit,
      },
    });
  }
}
