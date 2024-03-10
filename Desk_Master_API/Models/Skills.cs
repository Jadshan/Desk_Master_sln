using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.Models
{
    public class Skills
    {
       public int Id { get; set; }
       public string Skill { get; set; } = string.Empty;
       public string Proficiency { get; set; } = string.Empty;
       public string Experience { get; set; } = string.Empty;
       public string Technology { get; set; } = string.Empty;
       public string Version { get; set; } = string.Empty;
       public string CertificationFile { get; set; } = string.Empty;
        public int? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        
    }
}