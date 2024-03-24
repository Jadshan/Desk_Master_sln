using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.Models.Interview
{
    public class InterviewModel
    {
        public int Id { get; set; }
        public string CandidateName { get; set; } = string.Empty;
        public string CandidateEmail { get; set; } = string.Empty;
        public string CandidatePhoneNo { get; set; } = string.Empty;
        public DateTime Date {get; set;} 
        public string Time { get; set; } = string.Empty;
        public string AdditionalInfo { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public List<InterviewersListModel> InterviewersLists { get; set; } = new List<InterviewersListModel>();

    }
}