using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Helpers;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.Interfaces
{
    public interface IInterviewsRepository
    {
        Task<List<InterviewModel>> GetAllAsync();
        Task<List<InterviewModel>> GetAllByQueryAsync(QueryObj query);
        Task<InterviewModel?> GetByIdAsync(int id);
        Task<InterviewModel> CreateAsync(AddInterviewDataRequestDTO addedInterview);
        Task<InterviewModel?> UpdateAsync(int id,  UpdateInterviewDTO updatedInterview);
        Task<InterviewModel?> DeleteAsync(int id);
    }
}