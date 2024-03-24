

namespace Desk_Master_API.Models.Interview
{
    public class InterviewersListModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public int? EmployeeId { get; set; } 
        public int? InterviewId { get; set; } 
        public InterviewModel? Interview {get; set;}
    }
}