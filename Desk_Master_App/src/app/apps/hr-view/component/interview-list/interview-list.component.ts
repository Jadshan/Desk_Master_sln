import { Component, OnInit, ViewChild } from '@angular/core';
import { Interview } from '../../+store/Model';
import { HrService } from '../../service/hr.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddInterviewComponent } from '../add-interview/add-interview.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getInterviewList } from '../../+store/hr.selector';
import { loadInterview } from '../../+store/hr.action';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { showAlert } from '../../../../shared/store/App.action';
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
})
export class InterviewListComponent implements OnInit {
  displayedColumns: string[] = [
    'candidateName',
    'candidateEmail',
    'candidatePhoneNo',
    'date',
    'time',
    'interviewer',
    'additionalInfo',
    'action',
    'delete',
  ];
  interviews: Interview[] = [];
  dataSource: any;
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: HrService,
    private Dialog: MatDialog,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadInterview());
    this.store.select(getInterviewList).subscribe((list) => {
      this.interviews = list;

      this.dataSource = new MatTableDataSource<Interview>(this.interviews);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  AddInterview() {
    this.openPopup('Add New');
  }

  onChangeTimeSlot(id: any) {
    this.openPopup('Change', id);
  }

  onDelete(id: any) {
    this.service.deleteInterview(id).subscribe(() => {
      showAlert({
        message: 'Deleted',
        alertType: 'fail',
      });
    });
  }
  onEdit(id: any) {
    this.openPopup('Edit', id);
  }

  openPopup(title: string, id?: string) {
    this.Dialog.open(AddInterviewComponent, {
      width: '50%',
      height: title == 'Change' ? 'auto' : '800px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        id: id,
        title: title,
      },
    });
  }
}
