
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
    }
}