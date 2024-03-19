using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.InterviewBoardDTOs;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.Interfaces
{
    public interface IInterviewBoardRepository
    {
        Task<List<InterviewBoardModel>> GetAllAsync();
        Task<InterviewBoardModel?> GetByIdAsync(int id);
        Task<List<InterviewBoardModel>> CreateAsync(AddInterviewBoardDTO addInterviewBoardDTO);
        Task<InterviewBoardModel?> UpdateAsync(int id, UpdateInterviewBoardDTO updateInterviewBoard);
        Task<InterviewBoardModel?> DeleteAsync(int id);
    }
}