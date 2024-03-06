import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interview, TimeSlot } from '../+store/Model';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  constructor(private http: HttpClient) {}
  interviewUrl: string = 'http://localhost:3000/Interview';
  timeUrl: string = 'http://localhost:3000/TimeSlots';
  //timeUrl: string = 'https://localhost:7229/api/timeSlotAPI';

  getTimeSlot() {
    return this.http.get<TimeSlot[]>(this.timeUrl);
  }

  getInterviews() {
    return this.http.get<Interview[]>(this.interviewUrl);
  }

  addInterview(interviewData: Interview) {
    return this.http.post(this.interviewUrl, interviewData);
  }

  updateInterview(interviewData: Interview, id: string) {
    return this.http.put(this.interviewUrl + '/' + id, interviewData);
  }

  deleteInterview(id: string) {
    return this.http.delete(this.interviewUrl + '/' + id);
  }
}
