import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployHomeComponent } from './employ-home.component';

describe('EmployHomeComponent', () => {
  let component: EmployHomeComponent;
  let fixture: ComponentFixture<EmployHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployHomeComponent]
    });
    fixture = TestBed.createComponent(EmployHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
