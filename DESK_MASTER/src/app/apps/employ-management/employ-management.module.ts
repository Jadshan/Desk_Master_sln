import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployListingComponent } from './component/employ-listing/employ-listing.component';
import { EmployHandlingComponent } from './component/employ-handling/employ-handling.component';
import { MaterialModule } from 'src/Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployListingComponent, EmployHandlingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class EmployManagementModule {}
