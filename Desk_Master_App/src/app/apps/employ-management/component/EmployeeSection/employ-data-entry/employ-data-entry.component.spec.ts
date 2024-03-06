import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployDataEntryComponent } from './employ-data-entry.component';

describe('EmployDataEntryComponent', () => {
  let component: EmployDataEntryComponent;
  let fixture: ComponentFixture<EmployDataEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployDataEntryComponent]
    });
    fixture = TestBed.createComponent(EmployDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
