import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../service/schedule.service';
import { bookingObj, roomList, timeList } from '../../../+store/Model';
import { MakeBookingComponent } from '../make-booking/make-booking.component';
import { MatDialog } from '@angular/material/dialog';
import { userInfo } from 'src/app/auth/+Store/user.model';
import { UserService } from 'src/app/auth/service/user.service';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import {
  loadRoomBookingList,
  loadRoomList,
  loadTimeList,
} from '../../../+store/schedular.action';
import {
  getBookingsForDate,
  getRoomBookingList,
  getRoomList,
  getTimeList,
} from '../../../+store/schedular.selector';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  constructor(
    private service: ScheduleService,
    private userService: UserService,
    private Dialog: MatDialog,
    private store: Store
  ) {}
  roomDetails: roomList[] = [];
  timeDetails: timeList[] = [];
  bookingsData: bookingObj[] = [];
  bookingsDataByUser: bookingObj[] = [];
  bookingStatus: string = 'book';
  selectedDate: Date | null | undefined = new Date();
  userInfo!: userInfo;
  bookingDate: any = moment().format('MMM DD, YYYY');
  ngOnInit(): void {
    this.store.dispatch(loadRoomBookingList());
    this.userInfo = this.userService.GetUserDataFromStorage('userData');
    this.service
      .getBookingsForUser(this.userInfo.username)
      .subscribe((data) => {
        this.bookingsDataByUser = data;
      });
    this.store.dispatch(loadRoomList());
    this.store.select(getRoomList).subscribe((data) => {
      this.roomDetails = data;
    });
    this.store.dispatch(loadTimeList());
    this.store.select(getTimeList).subscribe((data) => {
      this.timeDetails = data;
    });
    this.service
      .getBookingsForDate(moment().format('MMM DD, YYYY'))
      .subscribe((data) => {
        this.bookingsData = data;
      });
  }

  onDateSelected(event: any): void {
    const momentDate = event.value;
    if (momentDate) {
      this.bookingDate = momentDate.format('MMM DD, YYYY');
      this.store
        .select(getBookingsForDate(this.bookingDate))
        .subscribe((data) => {
          this.bookingsData = data;
        });
    }
  }
  onBooking(room: roomList, time: timeList['time']) {
    this.openPopup(room, time, this.bookingDate);
  }

  openPopup(room: roomList, time: timeList['time'], selectedDate: any) {
    let dialogRef = this.Dialog.open(MakeBookingComponent, {
      width: '40%',
      //height: '400px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: { room, time, selectedDate },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(loadRoomBookingList());
      this.store
        .select(getBookingsForDate(this.bookingDate))
        .subscribe((data) => {
          this.bookingsData = data;
        });
    });
  }
  isRoomBooked(roomId: string, time: string): boolean {
    // Iterate through existing bookings to check for conflicts
    for (const booking of this.bookingsData) {
      if (booking.roomId == roomId && booking.fromTime == time) {
        this.bookingStatus = 'booked';
        return true; // Room is booked at this time
      } else {
        this.bookingStatus = 'book';
      }
    }
    return false; // Room is available at this time
  }

  showBooking(templateRef: any) {
    this.Dialog.open(templateRef, {
      width: 'auto',
      height: '500px',
    });
  }

  editBooking(bookingData: bookingObj) {
    const isEdit = true;
    this.Dialog.open(MakeBookingComponent, {
      width: 'auto',
      //height: '400px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: { bookingData, isEdit },
    });
  }

  deleteBooking(id: any) {
    this.service.deleteBooking(id).subscribe(
      (response) => {
        console.log('Booking saved successfully:', response);
      },
      (error) => {
        console.error('Error saving booking:', error);
      }
    );
  }
}
