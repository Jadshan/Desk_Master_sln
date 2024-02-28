import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './component/schedular_dashboard/schedular_dashboard.component';
import { ScheduleHandlerComponent } from './component/Customization/schedule-handler/schedule-handler.component';
import { BookingComponent } from './component/MeetingRoomBooking/booking/booking.component';
import { MaterialModule } from 'src/Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MakeBookingComponent } from './component/MeetingRoomBooking/make-booking/make-booking.component';
import { RouterModule } from '@angular/router';
import { RoomAllocationComponent } from './component/Customization/room-allocation/room-allocation.component';

@NgModule({
  declarations: [
    PackagesComponent,
    ScheduleHandlerComponent,

    BookingComponent,
    MakeBookingComponent,
    RoomAllocationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SchedulerModule {}
