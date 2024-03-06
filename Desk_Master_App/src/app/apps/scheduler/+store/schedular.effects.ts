import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ScheduleService } from '../service/schedule.service';
import {
  addRoomBooking,
  addRoomBookingSuccess,
  loadRoomBookingList,
  loadRoomBookingListSuccess,
  loadRoomList,
  loadRoomListSuccess,
  loadTimeList,
  loadTimeListSuccess,
  updateRoomBooking,
  updateRoomBookingSuccess,
} from './schedular.action';
import { bookingObj } from './Model';
import { showAlert } from '../../../shared/store/App.action';

@Injectable()
export class schedularEffects {
  constructor(private action$: Actions, private service: ScheduleService) {}

  _LoadTimeList = createEffect(() =>
    this.action$.pipe(
      ofType(loadTimeList),
      exhaustMap(() => {
        return this.service.GetAllTime().pipe(
          map((data) => {
            return loadTimeListSuccess({ timeList: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Loading failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _LoadRoomList = createEffect(() =>
    this.action$.pipe(
      ofType(loadRoomList),
      exhaustMap(() => {
        return this.service.GetAllRooms().pipe(
          map((data) => {
            return loadRoomListSuccess({ roomList: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Loading failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _loadInterview = createEffect(() =>
    this.action$.pipe(
      ofType(loadRoomBookingList),
      exhaustMap((action) => {
        return this.service.getBookingDetails().pipe(
          map((data) => {
            return loadRoomBookingListSuccess({ bookingList: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Loading failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _addInterView = createEffect(() =>
    this.action$.pipe(
      ofType(addRoomBooking),
      switchMap((action) =>
        this.service.saveBooking(action.bookingData).pipe(
          switchMap((data) =>
            of(
              addRoomBookingSuccess({ bookingData: data as bookingObj }),
              showAlert({
                message: 'Room booking added successfully',
                alertType: 'success',
              })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Adding failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );

  _updateInterview = createEffect(() =>
    this.action$.pipe(
      ofType(updateRoomBooking),
      switchMap((action) =>
        this.service
          .editBooking(action.bookingData.id as string, action.bookingData)
          .pipe(
            switchMap(() =>
              of(
                updateRoomBookingSuccess({
                  bookingData: action.bookingData,
                }),
                showAlert({
                  message: 'Room booking updated successfully',
                  alertType: 'success',
                })
              )
            ),
            catchError((_error) =>
              of(
                showAlert({
                  message: 'Updating failed - Due to' + _error.message,
                  alertType: 'fail',
                })
              )
            )
          )
      )
    )
  );
}
