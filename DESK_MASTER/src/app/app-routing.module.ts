import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './apps/CounterApp/counter/counter.component';
import { BlogComponent } from './apps/BlogApp/blog/blog.component';
import { authGuard } from './auth/Guard/auth.guard';
import { EmployListingComponent } from './apps/employ-management/component/employ-listing/employ-listing.component';
import { UserListingComponent } from './apps/user-management/component/user-listing/user-listing.component';
import { PackagesComponent } from './apps/scheduler/component/schedular_dashboard/schedular_dashboard.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { LoginComponent } from './auth/component/login/login.component';
import { BookingComponent } from './apps/scheduler/component/MeetingRoomBooking/booking/booking.component';
import { DashboardComponent } from './apps/hr-view/component/hr-dashboard/hr-dashboard.component';
import { RecruitmentComponent } from './apps/hr-view/component/recruitment/recruitment.component';
import { InterviewListComponent } from './apps/hr-view/component/interview-list/interview-list.component';
import { RecruitmentTeamComponent } from './apps/hr-view/component/recruitment-team/recruitment-team.component';
import { RoomAllocationComponent } from './apps/scheduler/component/Customization/room-allocation/room-allocation.component';
import { EmployDashboardComponent } from './apps/employ-management/component/employ-dashboard/employ-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'counter', component: CounterComponent, canActivate: [authGuard] },
  { path: 'blog', component: BlogComponent, canActivate: [authGuard] },
  {
    path: 'employ',
    component: EmployDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'Hr_View/employ',
    component: EmployDashboardComponent,
    canActivate: [authGuard],
  },
   {
    path: 'employ/employlist',
    component: EmployListingComponent,
    canActivate: [authGuard],
  },
   {
    path: 'Hr_View/employ/employlist',
    component: EmployListingComponent,
    canActivate: [authGuard],
  },
  { path: 'user', component: UserListingComponent, canActivate: [authGuard] },
  { path: 'Schedular', component: PackagesComponent, canActivate: [authGuard] },
  {
    path: 'Schedular/booking',
    component: BookingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'Schedular/room_allocation',
    component: RoomAllocationComponent,
    canActivate: [authGuard],
  },
  { path: 'Hr_View', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'Hr_View/recruitment',
    component: RecruitmentComponent,
    canActivate: [authGuard],
  },
  { path: 'Hr_View/recruitment/interview', component: InterviewListComponent },
  {
    path: 'Hr_View/recruitment/recruitmentTeam',
    component: RecruitmentTeamComponent,
  },
  {
    path: 'Hr_View/recruitment/interview/recruitmentTeam',
    component: RecruitmentTeamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
