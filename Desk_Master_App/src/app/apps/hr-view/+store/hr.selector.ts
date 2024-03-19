import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IInterviewBoard, Interview, InterviewModel, TimeSlot } from './Model';
import { IInterviewer } from '../../employ-management/+Store/Model/employee.model';
import moment from 'moment';

const getInterviewState = createFeatureSelector<InterviewModel>('interview');

export const getTimeAllocation = createSelector(getInterviewState, (state) => {
  return state.TimeAllocation;
});
export const getTimeSlotsList = createSelector(getInterviewState, (state) => {
  return state.TimeSlotsList;
});
export const getInterviewBoardList = createSelector(
  getInterviewState,
  (state) => {
    let _interviewBL: IInterviewBoard[] = [...state.InterviewBoardList];
    _interviewBL.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      // Reverse the comparison to sort in descending order
      return dateB.getTime() - dateA.getTime();
    });
    return _interviewBL;
  }
);
export const getInterviewList = createSelector(getInterviewState, (state) => {
  return sortInterview(state.InterviewList);
});
export const getInterviewersListByDate = (date: string) =>
  createSelector(getInterviewState, (state) => {
    // Get all time slots for the provided date
    const interviewBoardsForDate: IInterviewBoard[] =
      state.InterviewBoardList.filter((intB) => {
        // Filter time slots that match the provided date
        return moment(intB.date).format('MMM DD, YYYY') === date;
      });

    // Extract interviewers from the filtered interview boards
    const interviewersForDate: IInterviewer[] = interviewBoardsForDate.flatMap(
      (intB) => intB.interviewers
    );

    return interviewersForDate;
  });

export const getInterviewById = (interviewId: string) =>
  createSelector(getInterviewState, (state) => {
    return state.InterviewList.find(
      (interview: Interview) => interview.id == interviewId
    ) as Interview;
  });

function sortInterview(data: Interview[]) {
  const copiedData = [...data]; // Create a copy of the array
  const sortedInterviews = copiedData.sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) {
      return dateComparison; // If dates are different, sort by date
    } else {
      // If dates are the same, sort by timeSlot
      return compareTimeSlots(a.timeSlot, b.timeSlot);
    }
  });
  return sortedInterviews;
}

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

export const getTimeSlotList = createSelector(getInterviewState, (state) => {
  return state.TimeSlotList;
});

export const getTimeSlotListByDate = (date: string) =>
  createSelector(getInterviewState, (state) => {
    // Get all time slots for the provided date
    const interviewsForDate = state.InterviewList.filter((interview) => {
      // Filter time slots that do not match the provided date
      return interview.date == date;
    });

    const availableTimeSlots = state.TimeSlotsList.filter((timeSlot) => {
      // Check if the time slot is not occupied by any interview for the provided date
      return !interviewsForDate.some(
        (interview) => interview.timeSlot === timeSlot
      );
    });

    return availableTimeSlots;
  });

export const getInterviewListByDate = (date: string) =>
  createSelector(getInterviewState, (state) => {
    // Get all time slots for the provided date
    const interviewsForDate = state.InterviewList.filter((interview) => {
      // Filter time slots that do not match the provided date
      return interview.date == date;
    });

    return interviewsForDate;
  });
