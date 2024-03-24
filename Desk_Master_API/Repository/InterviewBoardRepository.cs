using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.InterviewBoardDTOs;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Desk_Master_API.Models.Interview;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Repository
{
    public class InterviewBoardRepository(ApplicationDBContext context) : IInterviewBoardRepository
    {
        private readonly ApplicationDBContext _context = context;
      public async Task<List<InterviewBoardModel>> CreateAsync(AddInterviewBoardDTO addInterviewBoardDTO)
    {   
    var interviewBoardModels = new List<InterviewBoardModel>();

    addInterviewBoardDTO.Interviewers?.ForEach(async intV =>
    {
        var addedInterviewBoard = addInterviewBoardDTO.ToInterviewBoardFromAddDTO(intV);
        await _context.InterviewBoardTbl.AddAsync(addedInterviewBoard);
        interviewBoardModels.Add(addedInterviewBoard);
    });
            
    await _context.SaveChangesAsync();
    
    return interviewBoardModels;
}



        public Task<InterviewBoardModel?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<InterviewBoardModel>> GetAllAsync()
        {
            return await _context.InterviewBoardTbl.ToListAsync();
        }

        public Task<InterviewBoardModel?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<InterviewBoardModel?> UpdateAsync(int id, UpdateInterviewBoardDTO updateInterviewBoard)
        {
            throw new NotImplementedException();
        }
    }
}