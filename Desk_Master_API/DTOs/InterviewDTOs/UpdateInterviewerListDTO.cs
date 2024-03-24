

namespace Desk_Master_API.DTOs.InterviewDTOs
{
    public class UpdateInterviewerListDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public int? EmployeeId { get; set; }
    }
}