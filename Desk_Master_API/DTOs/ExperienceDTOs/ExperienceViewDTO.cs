using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.DTOs.ExperienceDTOs
{
    public class ExperienceViewDTO
    {
       public int Id { get; set; }
       public string Company { get; set; } = string.Empty;
       public string StartDate { get; set; } = string.Empty;
       public string EndDate { get; set; } = string.Empty;
       public string Designation { get; set; } = string.Empty;
       public string Project { get; set; } = string.Empty;
       public int? EmployeeId { get; set; }
    }
}