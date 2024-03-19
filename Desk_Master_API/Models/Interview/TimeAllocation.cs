using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.Models.Interview
{
    public class TimeAllocation
    {
        public int Id { get; set; } 
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public int TimeSlotRange { get; set; } = 0;

    }
}