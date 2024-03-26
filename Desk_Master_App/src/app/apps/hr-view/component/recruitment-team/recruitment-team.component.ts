import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { loadUser } from '../../../user-management/+store/user.action';
import { getUserList } from '../../../user-management/+store/user.selector';
import { user } from '../../../../auth/+Store/user.model';
import { HrService } from '../../service/hr.service';
import { IInterviewBoard, ITimeAllocation } from '../../+store/Model';
import {
  addInterviewBoard,
  addTimeAllocation,
  loadInterviewBoard,
  loadTimeAllocation,
} from '../../+store/hr.action';
import {
  getInterviewBoardList,
  getTimeAllocation,
  getTimeSlotsList,
} from '../../+store/hr.selector';
import { Observable, startWith, map } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { getInterviewersList } from '../../../employ-management/+Store/Employee/employee.selector';
import { loadEmployeeData } from '../../../employ-management/+Store/Employee/employee.action';
import { IInterviewer } from '../../../employ-management/+Store/Model/employee.model';

@Component({
  selector: 'app-recruitment-team',
  templateUrl: './recruitment-team.component.html',
  styleUrls: ['./recruitment-team.component.css'],
})
export class RecruitmentTeamComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interviewerCtrl = new FormControl('');
  filteredInterviewers!: Observable<IInterviewer[]>;
  selectedInterviewers: IInterviewer[] = [];
  interviewers: string[] = [];
  allInterviewers: IInterviewer[] = [];
  @ViewChild('interviewerInput')
  interviewerInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  userList!: user[];
  timeAllocation: ITimeAllocation[] = [];
  employeeList: user[] = [];

  timeSlots: string[] = [];
  startTime = '09:00 AM';
  endTime = '5:00 PM';
  slotLengthInMinutes = 30;
  buttonStatus = 'set';
  interviewDate: any = new Date();
  selectedInterviewDate: any;
  interViewBoardList: IInterviewBoard[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedInterviewDate = this.interviewDate;
    this.store.dispatch(loadEmployeeData());
    this.store.select(getInterviewersList).subscribe((data) => {
      if (data) {
        this.allInterviewers = data;
        this.filteredInterviewers = this.interviewerCtrl.valueChanges.pipe(
          startWith(null),
          map((intV: string | null) =>
            intV ? this._filter(intV) : this.allInterviewers.slice()
          )
        );
      }
    });
    this.store.dispatch(loadInterviewBoard());
    this.store.select(getInterviewBoardList).subscribe((data) => {
      this.interViewBoardList = data;
    });
    this.store.dispatch(loadTimeAllocation());
    this.store.select(getTimeAllocation).subscribe((data) => {
      this.timeAllocation = data;
      if (this.timeAllocation.length > 0) {
        this.buttonStatus = 'SetNew';
        const _timeAllocation =
          this.timeAllocation[this.timeAllocation.length - 1];
        this.startTime = _timeAllocation.startTime;
        this.endTime = _timeAllocation.endTime;
        this.slotLengthInMinutes = _timeAllocation.timeSlotRange;
        this.store.select(getTimeSlotsList).subscribe((t) => {
          this.timeSlots = t;
        });
      }
    });
    //this.store.dispatch(loadUser());
    // this.store.select(getUserList).subscribe((list) => {
    //   this.userList = list as user[];
    //   if (this.userList.length > 1) {
    //     this.employeeList = this.userList.filter((user) => {
    //       return user.role === 'employee';
    //     });
    //   }
    // });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.interviewers.push(value);
    }
    event.chipInput!.clear();
    this.interviewerCtrl.setValue(null);
  }

  remove(intV: string): void {
    const index = this.interviewers.indexOf(intV);
    if (index >= 0) {
      this.interviewers.splice(index, 1);
      this.announcer.announce(`Removed ${intV}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.interviewers.push(event.option.viewValue);
    this.interviewerInput.nativeElement.value = '';
    this.interviewerCtrl.setValue(null);
  }

  private _filter(value: string): IInterviewer[] {
    const filterValue = value.toLowerCase();
    return this.allInterviewers.filter((interviewer) =>
      interviewer.name.toLowerCase().includes(filterValue)
    );
  }

  onSet() {
    const _timeAllocation: ITimeAllocation = {
      startTime: this.startTime,
      endTime: this.endTime,
      timeSlotRange: this.slotLengthInMinutes,
    };
    this.store.dispatch(addTimeAllocation({ timeAllocation: _timeAllocation }));
  }

  onDateSelected(event: any): void {
    const momentDate = event.value;
    if (momentDate) {
      this.selectedInterviewDate = new Date(momentDate);
      this.selectedInterviewDate.setMinutes(
        this.selectedInterviewDate.getMinutes() -
          this.selectedInterviewDate.getTimezoneOffset()
      );
    }
  }

  onSubmit() {
    this.selectedInterviewers = this.allInterviewers.filter((all) => {
      return this.interviewers.some(
        (selInt) => selInt === all.name + ' - ' + all.role
      );
    });
    const _interviewBoard: IInterviewBoard = {
      date: this.selectedInterviewDate.toISOString(),
      interviewers: this.selectedInterviewers,
    };
    this.store.dispatch(addInterviewBoard({ interviewBoard: _interviewBoard }));
    this.interviewers = [];
  }
}
