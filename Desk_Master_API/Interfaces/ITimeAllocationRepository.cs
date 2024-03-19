using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.Interfaces
{
    public interface ITimeAllocationRepository
    {
        Task<List<TimeAllocation>> GetTimeAllocationAsync();
        Task<TimeAllocation?> GetByIdAsync(int id);
        Task<TimeAllocation> CreateAsync(AddTimeAllocationDTO addTimeAllocation);
        Task<TimeAllocation?> UpdateAsync(int id, UpdateTimeAllocationDTO updateTimeAllocation);
        Task<TimeAllocation?> DeleteAsync(int id);
    }
}