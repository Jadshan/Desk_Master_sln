import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployListingComponent } from './component/employ-listing/employ-listing.component';
import { EmployHandlingComponent } from './component/employ-handling/employ-handling.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployDashboardComponent } from './component/AdminSection/employ-dashboard/employ-dashboard.component';
import { RouterModule } from '@angular/router';
import { EmployHomeComponent } from './component/EmployeeSection/employ-home/employ-home.component';
import { EmployDataEntryComponent } from './component/EmployeeSection/employ-data-entry/employ-data-entry.component';
import { AdminViewEmployDataComponent } from './component/AdminSection/admin-view-employ-data/admin-view-employ-data.component';
import { MaterialModule } from '../../../Material.Module';
import { EmployProfileComponent } from './component/EmployeeSection/employ-profile/employ-profile.component';

@NgModule({
  declarations: [
    EmployListingComponent,
    EmployHandlingComponent,
    EmployDashboardComponent,
    EmployHomeComponent,
    EmployDataEntryComponent,
    AdminViewEmployDataComponent,
    EmployProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class EmployManagementModule {}
