

namespace Desk_Master_API.DTOs.InterviewBoardDTOs
{
    public class UpdateInterviewBoardDTO
    {
        public DateTime Date {get; set;}
        public string Interviewer {get; set;} = string.Empty;
         public int? EmployeeId { get; set; }
    }
}