import { ScheduleModel } from './Model';

export const scheduleState: ScheduleModel = {
  bookingObj: {
    id: '',
    roomId: '',
    userId: '',
    bookingDate: '',
    fromTime: '',
    toTime: '',
    seatCount: 0,
    createdDate: '',
    updatedDate: '',
  },
  bookingList: [],
  timeList: [],
  roomList: [],
};
