import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployHandlingComponent } from './employ-handling.component';

describe('EmployHandlingComponent', () => {
  let component: EmployHandlingComponent;
  let fixture: ComponentFixture<EmployHandlingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployHandlingComponent]
    });
    fixture = TestBed.createComponent(EmployHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
