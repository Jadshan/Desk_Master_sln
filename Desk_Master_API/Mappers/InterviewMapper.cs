
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.Mappers
{
    public static class InterviewMapper
    {
         public static TimeAllocationViewDTO ToTimeAllocationViewDTO(this TimeAllocation timeAllocation)
        {
            return new TimeAllocationViewDTO
            {
              Id = timeAllocation.Id,
              StartTime = timeAllocation.StartTime,
              EndTime = timeAllocation.EndTime,
              TimeSlotRange = timeAllocation.TimeSlotRange
               
            };
        }
        public static TimeAllocation ToTimeAllocationFromAddDTO(this AddTimeAllocationDTO requestDTO)
        {
            return new TimeAllocation
            {
              StartTime = requestDTO.StartTime,
              EndTime = requestDTO.EndTime,
              TimeSlotRange = requestDTO.TimeSlotRange
            };
        }

         public static UpdateTimeAllocationDTO ToTimeAllocationDTO(this TimeAllocation timeAllocation)
        {
            return new UpdateTimeAllocationDTO
            {
              
              StartTime = timeAllocation.StartTime,
              EndTime = timeAllocation.EndTime,
              TimeSlotRange = timeAllocation.TimeSlotRange
               
            };
        }
        public static InterviewersListViewDTO ToInterviewersListViewDTO(this InterviewersListModel interviewersList)
        {
            return new InterviewersListViewDTO
           {
              //Id = interviewersList.Id,
              Name = interviewersList.Name,
              Role = interviewersList.Role,
              EmployeeId  = interviewersList.EmployeeId,
              //InterviewId = interviewersList.InterviewId
            };
        }
        public static InterviewsViewDTO ToInterviewViewDTO(this InterviewModel interview)
        {
            return new InterviewsViewDTO
            {
              Id = interview.Id,
              CandidateName = interview.CandidateName,
              CandidateEmail = interview.CandidateEmail,
              CandidatePhoneNo = interview.CandidatePhoneNo,
              Date = interview.Date,
              Time = interview.Time,
              AdditionalInfo = interview.AdditionalInfo,
              Status = interview.Status,
              InterviewersList = interview.InterviewersLists.Select(i => i.ToInterviewersListViewDTO()).ToList(),        
            };
        }
       public static InterviewModel ToInterviewDataFromAddDTO(this AddInterviewDataRequestDTO requestDTO)
        {
            return new InterviewModel
            {
              CandidateName = requestDTO.CandidateName,
              CandidateEmail = requestDTO.CandidateEmail,
              CandidatePhoneNo = requestDTO.CandidatePhoneNo,
              Date = requestDTO.Date,
              Time = requestDTO.Time,
              AdditionalInfo = requestDTO.AdditionalInfo,
              Status = requestDTO.Status,
            };
        }
      
      public static InterviewersListModel ToInterviewersListFromAddDTO(this AddInterviewersListRequestDTO requestDTO, int InterviewId)
        {
            return new InterviewersListModel
            {
              Name = requestDTO.Name,
              Role = requestDTO.Role,
              EmployeeId  = requestDTO.EmployeeId,
              InterviewId = InterviewId
            };
        }
    }
}