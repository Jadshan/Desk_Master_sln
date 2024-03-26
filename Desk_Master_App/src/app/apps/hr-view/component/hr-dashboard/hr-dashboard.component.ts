import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { getInterviewListByDate } from '../../+store/hr.selector';
import { IInterview } from '../../+store/Model';
import { trigger, transition, style, animate } from '@angular/animations';
import { loadInterview } from '../../+store/hr.action';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  interviewDate: any = moment().format('MMM DD, YYYY');
  todayInterviews: IInterview[] = [];
  currentIndex: number = 0;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadInterview());
    this.store
      .select(getInterviewListByDate(this.interviewDate))
      .subscribe((data) => {
        this.todayInterviews = data;
      });
    interval(5000).subscribe(() => {
      this.rotateInterviews();
    });
  }
  rotateInterviews(): void {
    // Shift the first interview to the end of the array
    if (this.todayInterviews.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.todayInterviews.length;
    }
  }
}
