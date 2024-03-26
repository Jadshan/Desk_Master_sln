

namespace Desk_Master_API.DTOs.InterviewDTOs
{
    public class InterviewersListViewDTO
    {
        //public int? Id { get; set; }
         public int? EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        
        //public int? InterviewId { get; set; } 
    }
}