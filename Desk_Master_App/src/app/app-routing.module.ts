import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
import { EmployDashboardComponent } from './apps/employ-management/component/AdminSection/employ-dashboard/employ-dashboard.component';
import { EmployHomeComponent } from './apps/employ-management/component/EmployeeSection/employ-home/employ-home.component';
import { EmployDataEntryComponent } from './apps/employ-management/component/EmployeeSection/employ-data-entry/employ-data-entry.component';
import { AdminViewEmployDataComponent } from './apps/employ-management/component/AdminSection/admin-view-employ-data/admin-view-employ-data.component';
import { BlogDashboardComponent } from './apps/BlogApp/components/blog-dashboard/blog-dashboard.component';
import { EmployProfileComponent } from './apps/employ-management/component/EmployeeSection/employ-profile/employ-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogDashboardComponent, canActivate: [authGuard] },
  {
    path: 'blog/localBlog',
    component: BlogComponent,
    canActivate: [authGuard],
  },

  {
    path: 'employHome',
    component: EmployHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employHome/employData',
    component: EmployDataEntryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employ',
    component: EmployDashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'employ-profile',
    component: EmployProfileComponent,
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
    component: AdminViewEmployDataComponent,
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
  {
    path: 'interview',
    component: InterviewListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'Hr_View/recruitment/interview',
    component: InterviewListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'recruitmentTeam',
    component: RecruitmentTeamComponent,
    canActivate: [authGuard],
  },
  {
    path: 'Hr_View/recruitment/interview/recruitmentTeam',
    component: RecruitmentTeamComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
