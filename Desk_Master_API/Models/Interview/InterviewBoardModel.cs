using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.Models.Interview
{
    public class InterviewBoardModel
    {
        public int Id { get; set; }
        public DateTime Date {get; set;}
        public string Interviewer {get; set;} = string.Empty;
        public string InterviewerRole {get; set;} = string.Empty;
         public int? InterviewerId { get; set; }
    }
}