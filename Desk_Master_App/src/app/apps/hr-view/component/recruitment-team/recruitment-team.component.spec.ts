import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentTeamComponent } from './recruitment-team.component';

describe('RecruitmentTeamComponent', () => {
  let component: RecruitmentTeamComponent;
  let fixture: ComponentFixture<RecruitmentTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruitmentTeamComponent]
    });
    fixture = TestBed.createComponent(RecruitmentTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
