import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployDashboardComponent } from './employ-dashboard.component';

describe('EmployDashboardComponent', () => {
  let component: EmployDashboardComponent;
  let fixture: ComponentFixture<EmployDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployDashboardComponent]
    });
    fixture = TestBed.createComponent(EmployDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
