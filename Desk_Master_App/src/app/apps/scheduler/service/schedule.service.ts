import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bookingObj, roomList, timeList } from '../+store/Model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  roomUrl: string = 'http://localhost:3000/Rooms';
  timeUrl: string = 'http://localhost:3000/TimeList';
  bookingUrl: string = 'http://localhost:3000/bookingDetails';

  GetAllRooms() {
    return this.http.get<roomList[]>(this.roomUrl);
  }

  GetAllTime() {
    return this.http.get<timeList[]>(this.timeUrl);
  }

  getBookingDetails() {
    return this.http.get<bookingObj[]>(this.bookingUrl);
  }

  saveBooking(bookingData: bookingObj) {
    return this.http.post(this.bookingUrl, bookingData);
  }

  editBooking(id: string, bookingData: bookingObj) {
    return this.http.put(this.bookingUrl + '/' + id, bookingData);
  }
  deleteBooking(id: string) {
    return this.http.delete(this.bookingUrl + '/' + id);
  }
  getBookingsForDate(date: any): Observable<bookingObj[]> {
    return this.http.get<bookingObj[]>(this.bookingUrl).pipe(
      map((bookings) => {
        // Filter the bookings based on the selected date
        return bookings.filter((booking) => {
          // Assuming bookingDate is a string in ISO 8601 format (YYYY-MM-DD)
          return booking.updatedDate === date;
        });
      })
    );
  }

  getBookingsForUser(user: string): Observable<bookingObj[]> {
    return this.http.get<bookingObj[]>(this.bookingUrl).pipe(
      map((bookings) => {
        // Filter the bookings based on the selected date
        return bookings.filter((booking) => {
          // Assuming bookingDate is a string in ISO 8601 format (YYYY-MM-DD)
          return booking.userId === user;
        });
      })
    );
  }
}
