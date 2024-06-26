import { IInterviewer } from '../../employ-management/+Store/Model/employee.model';

export interface ITimeAllocation {
  id?: number;
  startTime: string;
  endTime: string;
  timeSlotRange: number;
}

export interface Candidate {
  id?: number; // Optional ID, may be assigned by the backend
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  resume?: File; // Assuming file upload, you may need to adjust this
  educationHistory: Education[];
  workExperience?: Experience[];
  skills: string[];
  additionalInfo?: string; // Additional information, optional
}

export interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}

export interface Experience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date; // Optional if the candidate is still working there
}

export interface IInterview {
  id?: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhoneNo: string;
  date: string;
  time: string;
  interviewersList: IInterviewer[];
  additionalInfo?: string;
  status: string;
}

export interface TimeSlot {
  id?: string;
  timeSlot: string;
}

export interface InterviewModel {
  TimeSlotsList: string[];
  TimeSlotList: TimeSlot[];
  InterviewObj: IInterview;
  InterviewList: IInterview[];
  TimeAllocation: ITimeAllocation[];

  InterviewBoardList: IInterviewBoard[];
}

export interface IInterviewBoard {
  date: string;
  interviewers: IInterviewer[];
}
