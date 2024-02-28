import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSpinnerState } from 'src/app/shared/store/App.Selector';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  isLoading = false;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(getSpinnerState).subscribe((res) => {
      this.isLoading = res;
    });
  }
}
