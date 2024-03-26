import { createAction, props } from '@ngrx/store';
import { bookingObj, roomList, timeList } from './Model';

export enum actionTypes {
  LOAD_TIME_LIST = 'LOAD_TIME_LIST',
  LOAD_TIME_LIST_SUCCESS = 'LOAD_TIME_LIST_SUCCESS',
  LOAD_ROOM_LIST = 'LOAD_ROOM_LIST',
  LOAD_ROOM_LIST_SUCCESS = 'LOAD_ROOM_LIST_SUCCESS',
  LOAD_ROOM_BOOKING = 'LOAD_ROOM_BOOKING',
  LOAD_ROOM_BOOKING_SUCCESS = 'LOAD_ROOM_BOOKING_SUCCESS',
  ADD_ROOM_BOOKING = 'ADD_ROOM_BOOKING ',
  ADD_ROOM_BOOKING_SUCCESS = 'ADD_ROOM_BOOKING_SUCCESS',
  UPDATE_ROOM_BOOKING = 'UPDATE_ROOM_BOOKING ',
  UPDATE_ROOM_BOOKING_SUCCESS = 'UPDATE_ROOM_BOOKING_SUCCESS',
  DELETE_ROOM_BOOKING = 'DELETE_ROOM_BOOKING ',
  DELETE_ROOM_BOOKING_SUCCESS = 'DELETE_ROOM_BOOKING_SUCCESS',
}
export const loadTimeList = createAction(actionTypes.LOAD_TIME_LIST);

export const loadTimeListSuccess = createAction(
  actionTypes.LOAD_TIME_LIST_SUCCESS,
  props<{ timeList: timeList[] }>()
);

export const loadRoomList = createAction(actionTypes.LOAD_ROOM_LIST);

export const loadRoomListSuccess = createAction(
  actionTypes.LOAD_ROOM_LIST_SUCCESS,
  props<{ roomList: roomList[] }>()
);

export const loadRoomBookingList = createAction(actionTypes.LOAD_ROOM_BOOKING);

export const loadRoomBookingListSuccess = createAction(
  actionTypes.LOAD_ROOM_BOOKING_SUCCESS,
  props<{ bookingList: bookingObj[] }>()
);

export const addRoomBooking = createAction(
  actionTypes.ADD_ROOM_BOOKING,
  props<{ bookingData: bookingObj }>()
);

export const addRoomBookingSuccess = createAction(
  actionTypes.ADD_ROOM_BOOKING_SUCCESS,
  props<{ bookingData: bookingObj }>()
);

export const updateRoomBooking = createAction(
  actionTypes.UPDATE_ROOM_BOOKING,
  props<{ bookingData: bookingObj }>()
);

export const updateRoomBookingSuccess = createAction(
  actionTypes.UPDATE_ROOM_BOOKING_SUCCESS,
  props<{ bookingData: bookingObj }>()
);
