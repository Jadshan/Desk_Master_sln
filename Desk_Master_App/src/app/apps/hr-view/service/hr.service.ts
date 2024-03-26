import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IInterviewBoard,
  IInterview,
  ITimeAllocation,
  TimeSlot,
} from '../+store/Model';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  constructor(private http: HttpClient) {}
  //interviewUrl: string = 'http://localhost:3000/Interview';
  interviewUrl: string = 'http://localhost:5019/api/Interviews';
  // timeUrl: string = 'http://localhost:3000/TimeSlots';
  timeAllocationUrl: string = 'http://localhost:5019/api/TimeAllocation';
  interviewBoardUrl: string = 'http://localhost:5019/api/InterviewBoard';
  //timeUrl: string = 'https://localhost:7229/api/timeSlotAPI';

  getInterviewBoard() {
    return this.http.get<IInterviewBoard[]>(this.interviewBoardUrl);
  }
  addInterviewBoard(interviewBoard: IInterviewBoard) {
    return this.http.post<IInterviewBoard[]>(
      this.interviewBoardUrl,
      interviewBoard
    );
  }

  addTimeAllocation(timeAllocationData: ITimeAllocation) {
    return this.http.post(this.timeAllocationUrl, timeAllocationData);
  }
  getTimeAllocation() {
    return this.http.get<ITimeAllocation[]>(this.timeAllocationUrl);
  }

  getInterviews() {
    return this.http.get<IInterview[]>(this.interviewUrl + '/all');
  }

  addInterview(interviewData: IInterview) {
    return this.http.post(this.interviewUrl, interviewData);
  }

  updateInterview(interviewData: IInterview, id: string) {
    return this.http.put(this.interviewUrl + '/' + id, interviewData);
  }

  deleteInterview(id: string) {
    return this.http.delete(this.interviewUrl + '/' + id);
  }

  generateTimeSlots(
    startTime: string,
    endTime: string,
    timeSlotRange: number
  ): string[] {
    const timeSlots: string[] = [];

    // Function to convert time in HH:MM AM/PM format to minutes
    function timeToMinutes(time: string): number {
      const [hourStr, minuteStr, period] = time.split(/:| /);
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);
      if (period.toUpperCase() === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
      }
      return hour * 60 + minute;
    }

    // Convert start and end time to minutes
    const startTimeMinutes = timeToMinutes(startTime);
    const endTimeMinutes = timeToMinutes(endTime);

    // Generate time slots
    let currentMinutes = startTimeMinutes;
    while (currentMinutes < endTimeMinutes) {
      const startHour = Math.floor(currentMinutes / 60) % 12 || 12;
      const startMinute = currentMinutes % 60;
      const startPeriod = currentMinutes < 720 ? 'AM' : 'PM';

      const endMinutes = currentMinutes + timeSlotRange;
      const endHour = Math.floor(endMinutes / 60) % 12 || 12;
      const endMinute = endMinutes % 60;
      const endPeriod = endMinutes < 720 ? 'AM' : 'PM';

      const slotStart = `${startHour.toString().padStart(2, '0')}:${startMinute
        .toString()
        .padStart(2, '0')} ${startPeriod}`;
      const slotEnd = `${endHour.toString().padStart(2, '0')}:${endMinute
        .toString()
        .padStart(2, '0')} ${endPeriod}`;

      timeSlots.push(`${slotStart} - ${slotEnd}`);

      currentMinutes += timeSlotRange;
    }
    console.log(timeSlots);
    return timeSlots;
  }

  // getTimeSlot() {
  //   return this.http.get<TimeSlot[]>(this.timeUrl);
  // }
}
