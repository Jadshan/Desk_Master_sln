import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/hr-dashboard/hr-dashboard.component';
import { RouterModule } from '@angular/router';
import { RecruitmentComponent } from './component/recruitment/recruitment.component';
import { AddInterviewComponent } from './component/add-interview/add-interview.component';
import { InterviewListComponent } from './component/interview-list/interview-list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RecruitmentTeamComponent } from './component/recruitment-team/recruitment-team.component';
import { MaterialModule } from '../../../Material.Module';

@NgModule({
  declarations: [
    DashboardComponent,
    RecruitmentComponent,
    AddInterviewComponent,
    InterviewListComponent,
    RecruitmentTeamComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class HrViewModule {}
