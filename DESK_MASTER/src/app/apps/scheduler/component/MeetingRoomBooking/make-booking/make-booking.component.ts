import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { bookingObj, roomList } from '../../../+store/Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { userInfo } from 'src/app/auth/+Store/user.model';
import { UserService } from 'src/app/auth/service/user.service';
import { ScheduleService } from '../../../service/schedule.service';
import * as moment from 'moment';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css'],
})
export class MakeBookingComponent implements OnInit {
  roomData!: roomList;
  bookingData!: bookingObj;
  editingBooking!: bookingObj;
  defaultDate: Date = new Date(); // Set default date to today
  userInfo!: userInfo;
  title: string = 'Make booking';
  submitAction: string = 'Confirm booking';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MakeBookingComponent>,
    private userService: UserService,
    private schedularService: ScheduleService,
    private datePipe: DatePipe,
    private store: Store
  ) {
    if (data.isEdit) {
      this.title = 'Edit booking';
      this.submitAction = 'Update Booking';
      this.editingBooking = data.bookingData;
      this.bookingForm = this.fb.group({
        roomName: [
          { value: this.editingBooking.roomId, disabled: false },
          Validators.required,
        ],
        date: [
          { value: this.editingBooking.bookingDate, disabled: false },
          Validators.required,
        ],
        startingTime: [this.editingBooking.fromTime, Validators.required], // Default starting time
        endTime: [this.editingBooking.toTime, Validators.required], // Default end time
        seatCount: [this.editingBooking.seatCount, Validators.required],
      });
    } else {
      this.bookingForm = this.fb.group({
        roomName: [
          { value: data.room.RoomName, disabled: false },
          Validators.required,
        ],
        date: [
          { value: data.selectedDate, disabled: false },
          Validators.required,
        ],
        startingTime: [
          { value: data.time, disabled: false },
          Validators.required,
        ], // Default starting time
        endTime: ['11:11 PM', Validators.required], // Default end time
        seatCount: ['', Validators.required],
      });
    }
  }
  ngOnInit(): void {
    this.userInfo = this.userService.GetUserDataFromStorage('userData');
    this.roomData = this.data.room;
  }
  rooms = ['Room 1', 'Room 2', 'Room 3']; // Example room names
  bookingForm: FormGroup;

  cancel() {
    this.dialogRef.close();
  }
  submitForm() {
    if (this.bookingForm.valid) {
      const _bookingData: bookingObj = {
        roomId: this.bookingForm.value.roomName,
        userId: this.userInfo.username,
        bookingDate: this.datePipe.transform(
          this.bookingForm.value.date,
          'yyyy-MM-dd'
        ) as string,
        fromTime: this.bookingForm.value.startingTime,
        toTime: this.bookingForm.value.endTime,
        seatCount: this.bookingForm.value.seatCount,
        createdDate: this.data.selectedDate,
        updatedDate: this.data.selectedDate,
      };
      if (this.data.isEdit) {
        _bookingData.createdDate = this.editingBooking.createdDate;
        _bookingData.updatedDate = moment().format('MMM DD, YYYY');
        this.schedularService
          .editBooking(this.editingBooking.id as string, _bookingData)
          .subscribe(
            (response) => {
              this.cancel();
              console.log('Booking saved successfully:', response);
            },
            (error) => {
              console.error('Error saving booking:', error);
            }
          );
      } else {
        this.schedularService.saveBooking(_bookingData).subscribe(
          (response) => {
            this.cancel();
            console.log('Booking saved successfully:', response);
          },
          (error) => {
            console.error('Error saving booking:', error);
          }
        );
      }
    }
  }
}
