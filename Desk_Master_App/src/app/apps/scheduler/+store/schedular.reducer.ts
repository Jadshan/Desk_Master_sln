import { createReducer, on } from '@ngrx/store';
import { scheduleState } from './schedular.state';
import {
  addRoomBookingSuccess,
  loadRoomBookingListSuccess,
  loadRoomListSuccess,
  loadTimeListSuccess,
  updateRoomBookingSuccess,
} from './schedular.action';

export function schedularReducer(state: any, action: any) {
  return _schedularReducer(state, action);
}

const _schedularReducer = createReducer(
  scheduleState,
  on(loadTimeListSuccess, (state, action) => {
    return {
      ...state,
      timeList: [...action.timeList],
    };
  }),
  on(loadRoomListSuccess, (state, action) => {
    return {
      ...state,
      roomList: [...action.roomList],
    };
  }),
  on(loadRoomBookingListSuccess, (state, action) => {
    return {
      ...state,
      bookingList: [...action.bookingList],
    };
  }),

  on(addRoomBookingSuccess, (state, action) => {
    return {
      ...state,
      bookingList: [...state.bookingList, { ...action.bookingData }],
    };
  }),
  on(updateRoomBookingSuccess, (state, action) => {
    const _updatedBookingData = { ...action.bookingData };
    const _updatedBookingList = state.bookingList.map((booking) => {
      return booking.id === action.bookingData.id
        ? _updatedBookingData
        : booking;
    });
    return {
      ...state,
      InterviewList: _updatedBookingList,
    };
  })
);
