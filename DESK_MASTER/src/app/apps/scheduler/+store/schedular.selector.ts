import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScheduleModel } from './Model';

const getSchedularState = createFeatureSelector<ScheduleModel>('schedular');

export const getRoomBookingList = createSelector(getSchedularState, (state) => {
  return state.bookingList;
});

export const getBookingsForDate = (date: any) =>
  createSelector(getSchedularState, (state) => {
    return state.bookingList.filter((booking) => booking.updatedDate === date);
  });

export const getTimeList = createSelector(getSchedularState, (state) => {
  return state.timeList;
});

export const getRoomList = createSelector(getSchedularState, (state) => {
  return state.roomList;
});
