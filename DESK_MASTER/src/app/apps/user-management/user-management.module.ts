import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHandlingComponent } from './component/user-handling/user-handling.component';
import { UserListingComponent } from './component/user-listing/user-listing.component';

@NgModule({
  declarations: [
    UserHandlingComponent,
    UserListingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class UserManagementModule {}
