import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployListingComponent } from './employ-listing.component';

describe('EmployListingComponent', () => {
  let component: EmployListingComponent;
  let fixture: ComponentFixture<EmployListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployListingComponent]
    });
    fixture = TestBed.createComponent(EmployListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
