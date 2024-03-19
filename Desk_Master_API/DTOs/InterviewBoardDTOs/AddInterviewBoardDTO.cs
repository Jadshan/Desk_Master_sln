using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.DTOs.InterviewBoardDTOs
{
    public class AddInterviewBoardDTO
    {
        public DateTime Date {get; set;}
        public List<InterviewerModel> Interviewers {get; set;} = [];
    }
}