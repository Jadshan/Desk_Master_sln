import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateModel } from '../../../shared/store/AppState.Model';
import { getCounter } from '../+Store/counter.selector';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.css'],
})
export class CounterDisplayComponent implements OnInit, OnDestroy {
  counterSubscription!: Subscription;
  counterDisplay!: number;
  counter$!: Observable<number>;
  constructor(private store: Store<AppStateModel>) {}
  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}
