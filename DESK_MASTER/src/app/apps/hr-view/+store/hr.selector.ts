import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Interview, InterviewModel, TimeSlot } from './Model';

const getInterviewState = createFeatureSelector<InterviewModel>('interview');

export const getInterviewList = createSelector(getInterviewState, (state) => {
  return sortInterview(state.InterviewList);
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

    const availableTimeSlots = state.TimeSlotList.filter((timeSlot) => {
      // Check if the time slot is not occupied by any interview for the provided date
      return !interviewsForDate.some(
        (interview) => interview.timeSlot === timeSlot.timeSlot
      );
    });
    console.log(availableTimeSlots);

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
