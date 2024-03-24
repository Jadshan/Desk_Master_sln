

namespace Desk_Master_API.DTOs.InterviewBoardDTOs
{
    public class AddInterviewBoardDTO
    {
        public DateTime Date {get; set;}
        public List<AddInterviewerDTO> Interviewers {get; set;} = [];
    }
}