using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.InterviewBoardDTOs;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.Mappers
{
    public static class InterviewBoardMapper
    {
         public static InterviewBoardModel ToInterviewBoardFromAddDTO(this AddInterviewBoardDTO requestDTO, AddInterviewerDTO interviewer)
        {
            return new InterviewBoardModel
            {
              Date = requestDTO.Date,
              Interviewer = interviewer.Name,
              InterviewerRole = interviewer.Role,
              InterviewerId = interviewer.EmployeeId
            };
        }

           public static AddInterviewBoardDTO ToInterviewBoardView(this InterviewBoardModel requestDTO, List<InterviewBoardModel> interviewBoards)
        {
            var interviewers = new List<AddInterviewerDTO>();
            return new AddInterviewBoardDTO
            {
              Date = requestDTO.Date,
              Interviewers = interviewers,
            };
        }
    }
}