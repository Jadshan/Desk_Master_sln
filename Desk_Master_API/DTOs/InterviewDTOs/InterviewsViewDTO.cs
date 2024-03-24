using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Models.Interview;

namespace Desk_Master_API.DTOs.InterviewDTOs
{
    public class InterviewsViewDTO
    {
        public int Id { get; set; }
        public string CandidateName { get; set; } = string.Empty;
        public string CandidateEmail { get; set; } = string.Empty;
        public string CandidatePhoneNo { get; set; } = string.Empty;
        public DateTime Date {get; set;} 
        public string Time { get; set; } = string.Empty;
        public string AdditionalInfo { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public List<InterviewersListViewDTO>? InterviewersList { get; set; }
    }
}