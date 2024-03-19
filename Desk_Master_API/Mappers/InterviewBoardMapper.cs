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
         public static InterviewBoardModel ToInterviewBoardFromAddDTO(this AddInterviewBoardDTO requestDTO, InterviewerModel interviewer)
        {
            return new InterviewBoardModel
            {
              Date = requestDTO.Date,
              Interviewer = interviewer.Name,
              InterviewerRole = interviewer.Role,
              InterviewerId = interviewer.InterviewerId
            };
        }

           public static AddInterviewBoardDTO ToInterviewBoardView(this InterviewBoardModel requestDTO, List<InterviewBoardModel> interviewBoards)
        {
            var interviewers = new List<InterviewerModel>();
            return new AddInterviewBoardDTO
            {
              Date = requestDTO.Date,
              Interviewers = interviewers,
            };
        }
    }
}