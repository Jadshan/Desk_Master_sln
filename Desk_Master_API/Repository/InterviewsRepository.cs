using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Helpers;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Desk_Master_API.Models.Interview;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Repository
{
    public class InterviewsRepository(ApplicationDBContext context) : IInterviewsRepository
    {
          private readonly ApplicationDBContext _context = context;
        public async Task<InterviewModel> CreateAsync(AddInterviewDataRequestDTO addedInterview)
        {
            var _interviewModel = addedInterview.ToInterviewDataFromAddDTO();
            await _context.InterviewsTbl.AddAsync(_interviewModel);
            await _context.SaveChangesAsync();

                addedInterview.InterviewersList?.ForEach(interviewer => {
                    var _interviewer = interviewer.ToInterviewersListFromAddDTO(_interviewModel.Id);
                    _context.InterviewersListTbl.Add(_interviewer);
                });
                await _context.SaveChangesAsync(); 
            
            return _interviewModel;
        }

        public async Task<List<InterviewModel>> GetAllAsync()
        {
              return await _context.InterviewsTbl.Include(i => i.InterviewersLists).OrderByDescending(i => i.Date).ToListAsync();
        }

        public async Task<List<InterviewModel>> GetAllByQueryAsync(QueryObj query)
        {
                var interviews =  _context.InterviewsTbl.Include(i => i.InterviewersLists).AsQueryable();
                if(!string.IsNullOrWhiteSpace(query.CandidateName))
                {
                    interviews = interviews.Where(i => i.CandidateName.Contains(query.CandidateName));
                }
                return await interviews.ToListAsync();
        }
        public async Task<InterviewModel?> GetByIdAsync(int id)
        {
           return await _context.InterviewsTbl.Include(i => i.InterviewersLists).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<InterviewModel?> UpdateAsync(int id, UpdateInterviewDTO updatedInterview)
        {
            var _existingInterview = _context.InterviewsTbl.FirstOrDefault(i => i.Id == id);
            if(_existingInterview == null){
                return null;
            }
            _existingInterview.CandidateName = updatedInterview.CandidateName;
            _existingInterview.CandidateEmail = updatedInterview.CandidateEmail;
            _existingInterview.CandidatePhoneNo = updatedInterview.CandidatePhoneNo;
            _existingInterview.Date = updatedInterview.Date;
            _existingInterview.Time = updatedInterview.Time;
            _existingInterview.AdditionalInfo = updatedInterview.AdditionalInfo;
            _existingInterview.Status = updatedInterview.Status;

             var _existingInterviewersList = _context.InterviewersListTbl.Where(i => i.InterviewId == _existingInterview.Id).ToList();

            updatedInterview.InterviewersList?.ForEach(_updatedInterviewer =>{ 
                var _existingInterviewer = _existingInterviewersList.FirstOrDefault(I => I.EmployeeId == _updatedInterviewer.EmployeeId);
                if(_existingInterviewer == null){
                    _context.InterviewersListTbl.Add(_updatedInterviewer.ToInterviewersListFromAddDTO( _existingInterview.Id));
                }
                });

            _existingInterviewersList.ForEach(exist => {
                var existInUpdatingList = updatedInterview.InterviewersList?.FirstOrDefault(u => u.EmployeeId ==exist.EmployeeId);
                if(existInUpdatingList == null){
                     _context.InterviewersListTbl.Remove(exist);
                }
            });
            await _context.SaveChangesAsync();
            return _existingInterview;
        }

         public async Task<InterviewModel?> DeleteAsync(int id)
        {
             var interview = _context.InterviewsTbl.FirstOrDefault(x => x.Id == id);
             if(interview == null){
                return null;
            }
            _context.InterviewsTbl.Remove(interview);
           
            var interviewers = _context.InterviewersListTbl.Where(i => i.InterviewId == interview.Id).ToList();
            interviewers.ForEach(I => {
                //var interviewer = _context.InterviewersListTbl.FirstOrDefault(i => i.Id == I.Id);
                _context.InterviewersListTbl.Remove(I);
            });
             await _context.SaveChangesAsync();
            return interview;
        }

      
    }
}