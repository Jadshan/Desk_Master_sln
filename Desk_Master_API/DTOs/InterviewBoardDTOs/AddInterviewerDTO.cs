using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.DTOs.InterviewBoardDTOs
{
    public class AddInterviewerDTO
    {
        public string Name {get; set;} = string.Empty;
        public string Role {get; set;} = string.Empty;
         public int? EmployeeId { get; set; }
    }
}