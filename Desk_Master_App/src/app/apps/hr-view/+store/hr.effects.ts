import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HrService } from '../service/hr.service';
import {
  addInterview,
  addInterviewSuccess,
  loadInterview,
  loadInterviewSuccess,
  loadTimeAllocation,
  loadTimeAllocationSuccess,
  loadTimeSlot,
  loadTimeSlotSuccess,
  loadTimeSlots,
  updateInterview,
  updateInterviewSuccess,
} from './hr.action';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ITimeAllocation, Interview } from './Model';
import { showAlert } from '../../../shared/store/App.action';

@Injectable()
export class interviewEffects {
  constructor(private action$: Actions, private service: HrService) {}

  _loadTimeAllocation = createEffect(() =>
    this.action$.pipe(
      ofType(loadTimeAllocation),
      switchMap((action) =>
        this.service.getTimeAllocation().pipe(
          switchMap((data) => {
            const timeAllocation: ITimeAllocation = data[0];
            const timeSlots: string[] = this.service.generateTimeSlots(
              timeAllocation.startTime,
              timeAllocation.endTime,
              timeAllocation.timeSlotRange
            );
            return of(
              loadTimeAllocationSuccess({ timeAllocationList: data }),
              loadTimeSlots({ timeSlotsList: timeSlots })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'loading failed - Due to' + _error.message,
                alertType: 'fail',
              })
            )
          )
        )
      )
    )
  );

  _loadInterview = createEffect(() =>
    this.action$.pipe(
      ofType(loadInterview),
      exhaustMap((action) => {
        return this.service.getInterviews().pipe(
          map((data) => {
            // Sort the interviewList by date in descending order (newest first)
            const sortedInterviews = data.sort((a, b) => {
              const dateComparison =
                new Date(b.date).getTime() - new Date(a.date).getTime();
              if (dateComparison !== 0) {
                return dateComparison; // If dates are different, sort by date
              } else {
                // If dates are the same, sort by timeSlot
                return compareTimeSlots(a.timeSlot, b.timeSlot);
              }
            });
            return loadInterviewSuccess({ interviewList: sortedInterviews });
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

  _LoadTimeSlot = createEffect(() =>
    this.action$.pipe(
      ofType(loadTimeSlot),
      exhaustMap(() => {
        return this.service.getTimeSlot().pipe(
          map((data) => {
            return loadTimeSlotSuccess({ timeSlotList: data });
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
      ofType(addInterview),
      switchMap((action) =>
        this.service.addInterview(action.interviewData).pipe(
          switchMap((data) =>
            of(
              addInterviewSuccess({ interviewData: data as Interview }),
              showAlert({
                message: 'Interview added successfully',
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
      ofType(updateInterview),
      switchMap((action) =>
        this.service.updateInterview(action.interviewData, action.id).pipe(
          switchMap(() =>
            of(
              updateInterviewSuccess({
                interviewData: action.interviewData,
                id: action.id,
              }),
              showAlert({
                message: 'Interview updated successfully',
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

// Custom sorting function for timeSlots
function compareTimeSlots(a: string, b: string): number {
  const parseTime = (time: string): number => {
    const [hour, minute] = time.match(/\d+/g)!.map(Number);
    const isPM = time.includes('PM');
    return (hour % 12) * 60 + minute + (isPM ? 720 : 0); // Add 12 hours (720 minutes) if it's PM
  };

  const [startA] = a.split('-').map(parseTime);
  const [startB] = b.split('-').map(parseTime);

  return startA - startB;
}
