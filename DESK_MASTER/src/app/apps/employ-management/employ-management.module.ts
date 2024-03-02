import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployListingComponent } from './component/employ-listing/employ-listing.component';
import { EmployHandlingComponent } from './component/employ-handling/employ-handling.component';
import { MaterialModule } from 'src/Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployDashboardComponent } from './component/employ-dashboard/employ-dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EmployListingComponent, EmployHandlingComponent, EmployDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class EmployManagementModule {}
