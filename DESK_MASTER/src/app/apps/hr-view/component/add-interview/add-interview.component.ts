import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Interview, TimeSlot } from '../../+store/Model';
import { HrService } from '../../service/hr.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  addInterview,
  loadTimeSlot,
  updateInterview,
} from '../../+store/hr.action';
import {
  getInterviewById,
  getTimeSlotList,
  getTimeSlotListByDate,
} from '../../+store/hr.selector';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css'],
})
export class AddInterviewComponent implements OnInit {
  add($event: Event) {
    throw new Error('Method not implemented.');
  }
  title: string = 'Schedule New Interview';
  interviewForm!: FormGroup;
  interviewDate: any = new Date();
  timeList: TimeSlot[] = [];
  editingInterviewTime!: string;
  buttonStatus: string = 'Add New';
  constructor(
    private formBuilder: FormBuilder,
    private service: HrService,
    private dialogRef: MatDialogRef<AddInterviewComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.interviewForm = this.formBuilder.group({
      candidateName: ['', Validators.required],
      candidateEmail: ['', [Validators.required, Validators.email]],
      candidatePhoneNo: ['', Validators.required],
      date: [this.interviewDate, Validators.required],
      timeSlot: [this.timeList[0], Validators.required],
      interviewer: ['', Validators.required],
      additionalInfo: [''],
    });
  }
  ngOnInit(): void {
    this.title = this.data.title;
    if (this.title != 'Add New') {
      this.buttonStatus = this.data.title;
      this.store
        .select(getInterviewById(this.data.id))
        .subscribe((_editedInterview) => {
          this.interviewForm.setValue({
            candidateName: _editedInterview.candidateName,
            candidateEmail: _editedInterview.candidateEmail,
            candidatePhoneNo: _editedInterview.candidatePhoneNo,
            date: new Date(_editedInterview.date),
            timeSlot: _editedInterview.timeSlot,
            interviewer: _editedInterview.interviewer,
            additionalInfo: _editedInterview.additionalInfo,
          });
          this.interviewDate = new Date(_editedInterview.date);
          this.editingInterviewTime = _editedInterview.timeSlot;
        });
    }
    this.store.dispatch(loadTimeSlot());
    const selectedDate = moment(this.interviewDate).format('MMM DD, YYYY');
    this.store.select(getTimeSlotListByDate(selectedDate)).subscribe((time) => {
      this.timeList = time;
      if (this.title == 'Add New') {
        if (this.timeList.length > 0) {
          this.interviewForm.patchValue({
            timeSlot: this.timeList[0].timeSlot,
          });
        }
      } else {
        this.timeList.push({ id: 'edit', timeSlot: this.editingInterviewTime });
        this.interviewForm.patchValue({
          timeSlot: this.timeList[this.timeList.length - 1].timeSlot,
        });
      }
    });
    console.log(this.timeList);
  }

  onDateSelected(event: any): void {
    const momentDate = event.value;
    if (momentDate) {
      this.interviewDate = momentDate.format('MMM DD, YYYY');
    }
    this.store
      .select(getTimeSlotListByDate(this.interviewDate))
      .subscribe((time) => {
        // Call getTimeSlotListByDate with the initial interviewDate
        this.timeList = time;
        if (this.timeList.length > 0) {
          this.interviewForm.patchValue({
            timeSlot: this.timeList[0].timeSlot,
          });
        }
      });
  }

  onSubmit(): void {
    if (this.interviewForm.valid) {
      const _interviewData: Interview = {
        candidateName: this.interviewForm.value.candidateName,
        candidateEmail: this.interviewForm.value.candidateEmail,
        candidatePhoneNo: this.interviewForm.value.candidatePhoneNo,
        date: moment(this.interviewForm.value.date).format('MMM DD, YYYY'),
        timeSlot: this.interviewForm.value.timeSlot,
        interviewer: this.interviewForm.value.interviewer,
        additionalInfo: this.interviewForm.value.additionalInfo,
        status: true,
      };
      if (this.title != 'Add New') {
        this.store.dispatch(
          updateInterview({ interviewData: _interviewData, id: this.data.id })
        );
      } else {
        this.store.dispatch(addInterview({ interviewData: _interviewData }));
      }
      this.ClosePopup();
    }
  }
  ClosePopup() {
    this.dialogRef.close();
  }
}
