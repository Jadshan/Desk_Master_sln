import { createAction, props } from '@ngrx/store';
import { ITimeAllocation, Interview, TimeSlot } from './Model';

export enum actionTypes {
  LOAD_TIME_ALLOCATION = 'LOAD_TIME_ALLOCATION',
  LOAD_TIME_ALLOCATION_SUCCESS = 'LOAD_TIME_ALLOCATION_SUCCESS',
  ADD_TIME_ALLOCATION = 'ADD_TIME_ALLOCATION',
  ADD_TIME_ALLOCATION_SUCCESS = 'ADD_TIME_ALLOCATION_SUCCESS',
  UPDATE_TIME_ALLOCATION = 'UPDATE_TIME_ALLOCATION',
  UPDATE_TIME_ALLOCATION_SUCCESS = 'UPDATE_TIME_ALLOCATION_SUCCESS',
  LOAD_TIME_SLOTS = 'LOAD_TIME_SLOTS',

  LOAD_INTERVIEW = 'LOAD_INTERVIEW',
  LOAD_INTERVIEW_SUCCESS = 'LOAD_INTERVIEW _SUCCESS',
  ADD_INTERVIEW = 'ADD_INTERVIEW ',
  ADD_INTERVIEW_SUCCESS = 'ADD_INTERVIEW _SUCCESS',
  UPDATE_INTERVIEW = 'UPDATE_INTERVIEW ',
  UPDATE_INTERVIEW_SUCCESS = 'UPDATE_INTERVIEW _SUCCESS',
  DELETE_INTERVIEW = 'DELETE_INTERVIEW ',
  DELETE_INTERVIEW_SUCCESS = 'DELETE_INTERVIEW _SUCCESS',
  LOAD_TIME_SLOT = 'LOAD_TIME_SLOT',
  LOAD_TIME_SLOT_SUCCESS = 'LOAD_TIME_SLOT_SUCCESS',
}

export const loadTimeAllocation = createAction(
  actionTypes.LOAD_TIME_ALLOCATION
);
export const loadTimeAllocationSuccess = createAction(
  actionTypes.LOAD_TIME_ALLOCATION_SUCCESS,
  props<{ timeAllocationList: ITimeAllocation[] }>()
);
export const addTimeAllocation = createAction(
  actionTypes.ADD_TIME_ALLOCATION,
  props<{ timeAllocation: ITimeAllocation }>()
);

export const addTimeAllocationSuccess = createAction(
  actionTypes.ADD_TIME_ALLOCATION_SUCCESS,
  props<{ timeAllocation: ITimeAllocation }>()
);

export const updateTimeAllocation = createAction(
  actionTypes.UPDATE_TIME_ALLOCATION,
  props<{ timeAllocation: ITimeAllocation; id: number }>()
);

export const updateTimeAllocationSuccess = createAction(
  actionTypes.UPDATE_TIME_ALLOCATION_SUCCESS,
  props<{ timeAllocation: ITimeAllocation; id: number }>()
);

export const loadTimeSlots = createAction(
  actionTypes.LOAD_TIME_SLOTS,
  props<{ timeSlotsList: string[] }>()
);

export const loadInterview = createAction(actionTypes.LOAD_INTERVIEW);

export const loadInterviewSuccess = createAction(
  actionTypes.LOAD_INTERVIEW_SUCCESS,
  props<{ interviewList: Interview[] }>()
);

export const loadTimeSlot = createAction(actionTypes.LOAD_TIME_SLOT);

export const loadTimeSlotSuccess = createAction(
  actionTypes.LOAD_TIME_SLOT_SUCCESS,
  props<{ timeSlotList: TimeSlot[] }>()
);

export const addInterview = createAction(
  actionTypes.ADD_INTERVIEW,
  props<{ interviewData: Interview }>()
);

export const addInterviewSuccess = createAction(
  actionTypes.ADD_INTERVIEW_SUCCESS,
  props<{ interviewData: Interview }>()
);

export const updateInterview = createAction(
  actionTypes.UPDATE_INTERVIEW,
  props<{ interviewData: Interview; id: string }>()
);

export const updateInterviewSuccess = createAction(
  actionTypes.UPDATE_INTERVIEW_SUCCESS,
  props<{ interviewData: Interview; id: string }>()
);
