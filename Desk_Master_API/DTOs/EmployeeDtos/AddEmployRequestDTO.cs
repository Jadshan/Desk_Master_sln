using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.DTOs.EmployeeDtos
{
    public class AddEmployRequestDTO
    {
         public string EmpName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public decimal Salary { get; set; }
    }
}