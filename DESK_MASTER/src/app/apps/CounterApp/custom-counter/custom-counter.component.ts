import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/AppState.Model';
import {
  customChange,
  selectCalculationType,
} from 'src/app/apps/CounterApp/+Store/counter.action';

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrls: ['./custom-counter.component.css'],
})
export class CustomCounterComponent {
  counterInput!: number;
  actionType: string = 'add';
  calculationType: string = 'simpleChange';

  constructor(private store: Store<AppStateModel>) {}
  selectCalculation() {
    this.store.dispatch(
      selectCalculationType({ calculationType: this.calculationType })
    );
  }
  customChange() {
    this.store.dispatch(
      customChange({ value: +this.counterInput, action: this.actionType })
    );
  }
}
