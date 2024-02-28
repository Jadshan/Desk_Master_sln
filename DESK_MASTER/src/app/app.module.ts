import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/Material.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CounterComponent } from './apps/CounterApp/counter/counter.component';
import { BlogComponent } from './apps/BlogApp/blog/blog.component';
import { HomeComponent } from './home/home.component';
import { CounterButtonComponent } from './apps/CounterApp/counter-button/counter-button.component';
import { CounterDisplayComponent } from './apps/CounterApp/counter-display/counter-display.component';
import { CustomCounterComponent } from './apps/CounterApp/custom-counter/custom-counter.component';
import { MenuHeaderComponent } from './shared/Menu/menu-header/menu-header.component';
import { AppState } from './shared/store/App.state';
import { AddBlogComponent } from './apps/BlogApp/add-blog/add-blog.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BlogEffects } from './apps/BlogApp/+Store/blog.Effects';
import { AppEffects } from './shared/store/App.Effects';
import { LoadingSpinnerComponent } from './shared/Menu/loading-spinner/loading-spinner.component';
import { EmployManagementModule } from './apps/employ-management/employ-management.module';
import { employeeEffects } from './apps/employ-management/+Store/Employee/employee.effects';
import { UserManagementModule } from './apps/user-management/user-management.module';
import { userEffects } from './apps/user-management/+store/user.effects';
import { SchedulerModule } from './apps/scheduler/scheduler.module';
import { AuthModule } from './auth/auth.module';
import { authEffects } from './auth/+Store/user.effects';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { HrViewModule } from './apps/hr-view/hr-view.module';
import { interviewEffects } from './apps/hr-view/+store/hr.effects';
import { schedularEffects } from './apps/scheduler/+store/schedular.effects';

@NgModule({
  declarations: [
    AppComponent,
    CounterButtonComponent,
    CounterDisplayComponent,
    CustomCounterComponent,
    CounterComponent,
    BlogComponent,
    HomeComponent,
    MenuHeaderComponent,
    AddBlogComponent,
    LoadingSpinnerComponent,
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
  exports: [],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
