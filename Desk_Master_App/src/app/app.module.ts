import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './apps/BlogApp/components/blog/blog.component';
import { HomeComponent } from './home/home.component';
import { MenuHeaderComponent } from './shared/menu-header/menu-header.component';
import { AddBlogComponent } from './apps/BlogApp/components/add-blog/add-blog.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { BlogDashboardComponent } from './apps/BlogApp/components/blog-dashboard/blog-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './shared/store/App.state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './shared/store/App.Effects';
import { employeeEffects } from './apps/employ-management/+Store/Employee/employee.effects';
import { BlogEffects } from './apps/BlogApp/+Store/blog.Effects';
import { authEffects } from './auth/+Store/user.effects';
import { interviewEffects } from './apps/hr-view/+store/hr.effects';
import { schedularEffects } from './apps/scheduler/+store/schedular.effects';
import { MaterialModule } from '../Material.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EmployManagementModule } from './apps/employ-management/employ-management.module';
import { SchedulerModule } from './apps/scheduler/scheduler.module';
import { AuthModule } from './auth/auth.module';
import { HrViewModule } from './apps/hr-view/hr-view.module';
import { DatePipe } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { userEffects } from './auth/user-management/+store/user.effects';
import { UserManagementModule } from './auth/user-management/user-management.module';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent,
    MenuHeaderComponent,
    AddBlogComponent,
    LoadingSpinnerComponent,
    BlogDashboardComponent,
  ],
  imports: [
    StoreModule.forRoot(AppState, {}),
    EffectsModule.forRoot([
      AppEffects,
      BlogEffects,
      employeeEffects,
      userEffects,
      authEffects,
      interviewEffects,
      schedularEffects,
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    EmployManagementModule,
    UserManagementModule,
    SchedulerModule,
    AuthModule,
    HrViewModule,
  ],
  providers: [DatePipe, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
