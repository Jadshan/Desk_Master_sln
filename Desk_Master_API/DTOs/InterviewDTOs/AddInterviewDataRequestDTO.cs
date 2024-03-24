

namespace Desk_Master_API.DTOs.InterviewDTOs
{
    public class AddInterviewDataRequestDTO
    {
         public string CandidateName { get; set; } = string.Empty;
        public string CandidateEmail { get; set; } = string.Empty;
        public string CandidatePhoneNo { get; set; } = string.Empty;
        public DateTime Date {get; set;} 
        public string Time { get; set; } = string.Empty;
        public string AdditionalInfo { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public List<AddInterviewersListRequestDTO>? InterviewersList { get; set; }
    }
}