using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.DTOs.InterviewBoardDTOs
{
    public class UpdateInterviewBoardDTO
    {
        public DateTime Date {get; set;}
        public string Interviewer {get; set;} = string.Empty;
         public int? InterviewerId { get; set; }
    }
}