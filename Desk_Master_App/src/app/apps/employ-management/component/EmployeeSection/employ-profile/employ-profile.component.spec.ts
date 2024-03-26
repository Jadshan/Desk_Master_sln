import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployProfileComponent } from './employ-profile.component';

describe('EmployProfileComponent', () => {
  let component: EmployProfileComponent;
  let fixture: ComponentFixture<EmployProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
