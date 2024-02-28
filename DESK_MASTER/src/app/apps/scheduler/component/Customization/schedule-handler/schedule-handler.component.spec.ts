import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHandlerComponent } from './schedule-handler.component';

describe('ScheduleHandlerComponent', () => {
  let component: ScheduleHandlerComponent;
  let fixture: ComponentFixture<ScheduleHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleHandlerComponent]
    });
    fixture = TestBed.createComponent(ScheduleHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
