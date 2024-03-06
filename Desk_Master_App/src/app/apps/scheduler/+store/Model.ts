export interface roomList {
  roomId?: string;
  RoomName: string;
  roomLocation?: string;
  roomSeatingCapacity: number;
  isRoomActive: boolean;
  managerId?: number;
  createdDate?: Date;
  lastUpdated?: Date;
}

export interface bookingObj {
  id?: string;
  roomId: string;
  userId: string;
  bookingDate: string;
  fromTime: string;
  toTime: string;
  seatCount: number;
  createdDate: string;
  updatedDate: string;
}

export interface timeList {
  timeId: number;
  time: string;
}

export interface ScheduleModel {
  bookingObj: bookingObj;
  bookingList: bookingObj[];
  timeList: timeList[];
  roomList: roomList[];
}
