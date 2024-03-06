import { createReducer, on } from '@ngrx/store';
import { InterviewState } from './hr.state';
import {
  addInterviewSuccess,
  loadInterviewSuccess,
  loadTimeSlotSuccess,
  updateInterviewSuccess,
} from './hr.action';

const _interviewReducer = createReducer(
  InterviewState,
  on(loadInterviewSuccess, (state, action) => {
    return {
      ...state,
      InterviewList: [...action.interviewList],
    };
  }),
  on(loadTimeSlotSuccess, (state, action) => {
    return {
      ...state,
      TimeSlotList: [...action.timeSlotList],
    };
  }),
  on(addInterviewSuccess, (state, action) => {
    return {
      ...state,
      InterviewList: [...state.InterviewList, { ...action.interviewData }],
    };
  }),
  on(updateInterviewSuccess, (state, action) => {
    const id = action.id;
    const _updateInterview = { ...action.interviewData };
    const _updatedInterviewList = state.InterviewList.map((interview) => {
      return interview.id === action.id ? _updateInterview : interview;
    });
    return {
      ...state,
      InterviewList: _updatedInterviewList,
    };
  })
);

export function hrReducer(state: any, action: any) {
  return _interviewReducer(state, action);
}
