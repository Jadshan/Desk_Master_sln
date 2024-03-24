
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Desk_Master_API.Models.Interview;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Repository
{
    public class TimeAllocationRepository(ApplicationDBContext context) : ITimeAllocationRepository
    {
        private readonly ApplicationDBContext _context = context;

         public async Task<List<TimeAllocation>> GetTimeAllocationAsync()
        {
            return await _context.TimeAllocationTbl.ToListAsync();
        }
        public async Task<TimeAllocation> CreateAsync(AddTimeAllocationDTO addTimeAllocation)
        {
            var _addTimeAllocation = addTimeAllocation.ToTimeAllocationFromAddDTO();
            await _context.TimeAllocationTbl.AddAsync(_addTimeAllocation);
            await _context.SaveChangesAsync();
            return _addTimeAllocation;
        }

        public async Task<TimeAllocation?> GetByIdAsync(int id)
        {
             return await _context.TimeAllocationTbl.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<TimeAllocation?> UpdateAsync(int id, UpdateTimeAllocationDTO updatedTimeAllocation)
        {
            var existingTimeAllocation = _context.TimeAllocationTbl.FirstOrDefault(x => x.Id == id);
            if(existingTimeAllocation == null){
                return null;
            }
            existingTimeAllocation.StartTime = updatedTimeAllocation.StartTime;
            existingTimeAllocation.EndTime = updatedTimeAllocation.EndTime;
            existingTimeAllocation.TimeSlotRange = updatedTimeAllocation.TimeSlotRange;
            await _context.SaveChangesAsync();
            return existingTimeAllocation;

        }

        public async Task<TimeAllocation?> DeleteAsync(int id)
        {
             var timeAllocation = _context.TimeAllocationTbl.FirstOrDefault(x => x.Id == id);
             if(timeAllocation == null){
                return null;
            }
            _context.TimeAllocationTbl.Remove(timeAllocation);
            await _context.SaveChangesAsync();
            return timeAllocation;
        }
    }
}