import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HrService } from '../service/hr.service';
import {
  addInterview,
  addInterviewBoard,
  addInterviewBoardSuccess,
  addInterviewSuccess,
  addTimeAllocation,
  addTimeAllocationSuccess,
  loadInterview,
  loadInterviewBoard,
  loadInterviewBoardSuccess,
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

import { IInterviewBoard, ITimeAllocation, IInterview } from './Model';
import { showAlert } from '../../../shared/store/App.action';

@Injectable()
export class interviewEffects {
  constructor(private action$: Actions, private service: HrService) {}

  _loadInterviewBoard = createEffect(() =>
    this.action$.pipe(
      ofType(loadInterviewBoard),
      switchMap((action) =>
        this.service.getInterviewBoard().pipe(
          switchMap((data) => {
            return of(loadInterviewBoardSuccess({ interviewBoardList: data }));
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

  _addInterviewBoard = createEffect(() =>
    this.action$.pipe(
      ofType(addInterviewBoard),
      switchMap((action) =>
        this.service.addInterviewBoard(action.interviewBoard).pipe(
          switchMap((data) => {
            return of(loadInterviewBoardSuccess({ interviewBoardList: data }));
          }),
          catchError((_error) =>
            of()
            // showAlert({
            //   message: 'addinghhhhhhhhhhhhh failed - Due to' + _error.message,
            //   alertType: 'fail',
            // })
          )
        )
      )
    )
  );

  _loadTimeAllocation = createEffect(() =>
    this.action$.pipe(
      ofType(loadTimeAllocation),
      switchMap((action) =>
        this.service.getTimeAllocation().pipe(
          switchMap((data) => {
            const timeAllocation: ITimeAllocation = data[data.length - 1];
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

  _addTimeAllocation = createEffect(() =>
    this.action$.pipe(
      ofType(addTimeAllocation),
      switchMap((action) =>
        this.service.addTimeAllocation(action.timeAllocation).pipe(
          switchMap((data) => {
            const timeAllocation: ITimeAllocation = data as ITimeAllocation;
            const timeSlots: string[] = this.service.generateTimeSlots(
              timeAllocation.startTime,
              timeAllocation.endTime,
              timeAllocation.timeSlotRange
            );
            return of(
              addTimeAllocationSuccess({
                timeAllocation: data as ITimeAllocation,
              }),
              loadTimeSlots({ timeSlotsList: timeSlots })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'adding failed - Due to' + _error.message,
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
                return compareTimeSlots(a.time, b.time);
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

  // _LoadTimeSlot = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(loadTimeSlot),
  //     exhaustMap(() => {
  //       return this.service.getTimeSlot().pipe(
  //         map((data) => {
  //           return loadTimeSlotSuccess({ timeSlotList: data });
  //         }),
  //         catchError((_error) =>
  //           of(
  //             showAlert({
  //               message: 'Loading failed - Due to' + _error.message,
  //               alertType: 'fail',
  //             })
  //           )
  //         )
  //       );
  //     })
  //   )
  // );

  _addInterView = createEffect(() =>
    this.action$.pipe(
      ofType(addInterview),
      switchMap((action) =>
        this.service.addInterview(action.interviewData).pipe(
          switchMap((data) =>
            of(
              addInterviewSuccess({ interviewData: data as IInterview }),
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
  // Null check for a and b
  if (a === null || b === null) {
    console.error('Error: time is null');
    return 0; // or some default value
  }

  const parseTime = (time: string): number => {
    const [hour, minute] = time.match(/\d+/g)!.map(Number);
    const isPM = time.includes('PM');
    return (hour % 12) * 60 + minute + (isPM ? 720 : 0); // Add 12 hours (720 minutes) if it's PM
  };

  // Splitting after null check
  const [startA] = a.split('-')?.map(parseTime) || [0]; // Default to [0] if split returns null
  const [startB] = b.split('-')?.map(parseTime) || [0]; // Default to [0] if split returns null

  return startA - startB;
}
