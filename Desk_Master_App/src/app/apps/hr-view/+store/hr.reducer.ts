import { createReducer, on } from '@ngrx/store';
import { InterviewState } from './hr.state';
import {
  addInterviewBoardSuccess,
  addInterviewSuccess,
  addTimeAllocationSuccess,
  loadInterviewBoardSuccess,
  loadInterviewSuccess,
  loadTimeAllocationSuccess,
  loadTimeSlotSuccess,
  loadTimeSlots,
  updateInterviewSuccess,
} from './hr.action';
import { IInterview, ITimeAllocation } from './Model';

const _interviewReducer = createReducer(
  InterviewState,
  on(loadTimeAllocationSuccess, (state, action) => {
    return {
      ...state,
      TimeAllocation: [...action.timeAllocationList],
    };
  }),
  on(addTimeAllocationSuccess, (state, action) => {
    const _addedTimeAllocation = { ...action.timeAllocation };
    let updatedTimeAllocation: ITimeAllocation[] = [];
    if (state.TimeAllocation.length > 0) {
      updatedTimeAllocation = state.TimeAllocation.map((t) => {
        return (t = _addedTimeAllocation);
      });
    } else {
      updatedTimeAllocation.push(_addedTimeAllocation);
    }
    return {
      ...state,
      TimeAllocation: updatedTimeAllocation,
    };
  }),
  on(loadTimeSlots, (state, action) => {
    return {
      ...state,
      TimeSlotsList: [...action.timeSlotsList],
    };
  }),

  on(loadInterviewBoardSuccess, (state, action) => {
    return {
      ...state,
      InterviewBoardList: [...action.interviewBoardList],
    };
  }),
  on(addInterviewBoardSuccess, (state, action) => {
    return {
      ...state,
      InterviewBoardList: [
        ...state.InterviewBoardList,
        { ...action.interviewBoard },
      ],
    };
  }),
  /////////
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
    const _updateInterview: IInterview = { ...action.interviewData };
    _updateInterview.id = action.id;
    const _updatedInterviewList = state.InterviewList.map((interview) => {
      return interview.id === _updateInterview.id
        ? _updateInterview
        : interview;
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
