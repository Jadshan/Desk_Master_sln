import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewEmployDataComponent } from './admin-view-employ-data.component';

describe('AdminViewEmployDataComponent', () => {
  let component: AdminViewEmployDataComponent;
  let fixture: ComponentFixture<AdminViewEmployDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewEmployDataComponent]
    });
    fixture = TestBed.createComponent(AdminViewEmployDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
