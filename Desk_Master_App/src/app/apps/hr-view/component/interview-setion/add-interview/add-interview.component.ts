import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IInterview, TimeSlot } from '../../../+store/Model';
import {
  addInterview,
  loadInterviewBoard,
  loadTimeAllocation,
  updateInterview,
} from '../../../+store/hr.action';
import {
  getInterviewById,
  getInterviewersListByDate,
  getTimeSlotListByDate,
} from '../../../+store/hr.selector';
import { DateAdapter } from '@angular/material/core';
import { IInterviewer } from '../../../../employ-management/+Store/Model/employee.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import moment from 'moment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css'],
})
export class AddInterviewComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interviewerCtrl = new FormControl('');
  title = 'Schedule New Interview';
  interviewForm!: FormGroup;
  interviewDate: any = new Date();
  timeList: TimeSlot[] = [];
  editingInterviewTime!: string;
  buttonStatus = 'Add New';
  interviewersForDate: IInterviewer[] = [];
  timeSlots: string[] = [];
  interviewers: IInterviewer[] = [];
  @ViewChild('interviewerInput')
  interviewerInput!: ElementRef<HTMLInputElement>;
  filteredInterviewers$: Observable<IInterviewer[]> | undefined;
  editedInterviewDate = '';
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddInterviewComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.title = this.data.title;
    this.initializeForm();
    this.filteredInterviewers$ = of([]);
  }

  ngOnInit(): void {
    const selectedDate = moment(this.interviewDate).format('MMM DD, YYYY');
    this.loadTimeSlots(selectedDate);
    this.updateForm();
  }

  initializeForm(): void {
    this.interviewForm = this.formBuilder.group({
      candidateName: ['', Validators.required],
      candidateEmail: ['', [Validators.required, Validators.email]],
      candidatePhoneNo: ['', Validators.required],
      date: [this.interviewDate, Validators.required],
      timeSlot: [this.timeSlots[0], Validators.required],
      interviewer: [''],
      additionalInfo: [''],
    });
  }

  // updateForm(): void {
  //   if (this.title != 'Add New') {
  //     this.buttonStatus = this.data.title;
  //     this.store
  //       .select(getInterviewById(this.data.id))
  //       .subscribe((_editedInterview) => {
  //         this.interviewForm.setValue({
  //           candidateName: _editedInterview.candidateName,
  //           candidateEmail: _editedInterview.candidateEmail,
  //           candidatePhoneNo: _editedInterview.candidatePhoneNo,
  //           date: new Date(_editedInterview.date),
  //           timeSlot: _editedInterview.time,
  //           additionalInfo: _editedInterview.additionalInfo,
  //         });
  //         this.interviewDate = new Date(_editedInterview.date);
  //         this.editingInterviewTime = _editedInterview.time;
  //         this.initializeInterviewers(
  //           moment(_editedInterview.date).format('MMM DD, YYYY')
  //         );
  //         this.interviewers = _editedInterview.interviewersList;
  //       });
  //   }
  // }

  initializeInterviewers(selectedDate: string): void {
    this.store.dispatch(loadInterviewBoard());
    this.store
      .select(getInterviewersListByDate(selectedDate))
      .subscribe((interviewers) => {
        this.interviewersForDate = interviewers;
        this.filteredInterviewers$ = this.interviewForm
          .get('interviewer')
          ?.valueChanges.pipe(
            startWith(null),
            map((value: string | null) =>
              value
                ? this._filterInterviewers(value)
                : this.interviewersForDate.slice()
            )
          );
      });
  }

  loadTimeSlots(selectedDate: string): void {
    this.title = this.data.title;
    this.initializeInterviewers(selectedDate);
    this.store.dispatch(loadTimeAllocation());
    this.store
      .select(getTimeSlotListByDate(selectedDate))
      .subscribe((timeSlots) => {
        this.timeSlots = timeSlots;
        if (this.title === 'Add New' && this.timeSlots.length > 0) {
          this.interviewForm.patchValue({
            timeSlot: this.timeSlots[0],
          });
        } else {
          this.timeSlots.push(this.editingInterviewTime);
          this.interviewForm.patchValue({
            timeSlot: this.timeSlots[this.timeSlots.length - 1],
          });
        }
      });
  }

  updateForm(): void {
    if (this.title !== 'Add New') {
      this.buttonStatus = this.data.title;
      this.store
        .select(getInterviewById(this.data.id))
        .subscribe((editedInterview) => {
          this.interviewForm.patchValue({
            candidateName: editedInterview.candidateName,
            candidateEmail: editedInterview.candidateEmail,
            candidatePhoneNo: editedInterview.candidatePhoneNo,
            date: new Date(editedInterview.date),
            timeSlot: editedInterview.time,
            additionalInfo: editedInterview.additionalInfo,
          });
          this.editingInterviewTime = editedInterview.time;
          this.interviewers =
            editedInterview.interviewersList as IInterviewer[];
          this.editedInterviewDate = moment(editedInterview.date).format(
            'MMM DD, YYYY'
          );
        });
      this.loadTimeSlots(this.editedInterviewDate);
      this.initializeInterviewers(this.editedInterviewDate);
    }
  }

  onDateSelected(event: any): void {
    const momentDate = event.value;
    if (momentDate) {
      this.interviewDate = momentDate.format('MMM DD, YYYY');
    }
    this.initializeInterviewers(this.interviewDate);
    this.loadTimeSlots(this.interviewDate);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.interviewers = [...this.interviewers, event.option.value];

    this.interviewerInput.nativeElement.value = '';
    this.interviewForm.get('interviewer')?.setValue(null);
    const index = this.interviewersForDate.indexOf(event.option.value);
    if (index !== -1) {
      this.interviewersForDate.splice(index, 1);
      // Reassign the filteredInterviewers$ observable with the updated interviewersForDate
      this.filteredInterviewers$ = of(this.interviewersForDate.slice());
    }
  }

  remove(interviewer: IInterviewer): void {
    const index = this.interviewers.indexOf(interviewer);
    if (index >= 0) {
      this.interviewers = this.interviewers.filter(
        (i) => i.employeeId !== interviewer.employeeId
      );
    }
    this.filteredInterviewers$?.subscribe((interviewers) => {
      interviewers.push(interviewer);
      this.filteredInterviewers$ = of(interviewers);
    });
  }

  private _filterInterviewers(value: string): IInterviewer[] {
    if (!value || typeof value !== 'string') {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.interviewersForDate.filter((interviewer) =>
      interviewer.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    if (this.interviewForm.valid) {
      const _interviewData: IInterview = {
        candidateName: this.interviewForm.value.candidateName,
        candidateEmail: this.interviewForm.value.candidateEmail,
        candidatePhoneNo: this.interviewForm.value.candidatePhoneNo,
        date: this.interviewForm.value.date.toISOString(),
        time: this.interviewForm.value.timeSlot,
        interviewersList: this.interviewers,
        additionalInfo: this.interviewForm.value.additionalInfo,
        status: '',
      };
      console.log(_interviewData);

      if (this.title !== 'Add New') {
        this.store.dispatch(
          updateInterview({ interviewData: _interviewData, id: this.data.id })
        );
      } else {
        this.store.dispatch(addInterview({ interviewData: _interviewData }));
      }
      this.closePopup();
    }
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
