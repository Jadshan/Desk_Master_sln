using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.ContactDtos;
using Desk_Master_API.DTOs.ContactDtos;
using Desk_Master_API.Models;

namespace Desk_Master_API.DTOs.EmployeeDtos
{
    public class EmployeeFullViewDTO
    {
        public int Id { get; set; } 
        public string EmpName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public List<ContactDetaillViewDTO>? ContactDetails {get; set;}
        public List<BankDetailViewDTO>? BankDetails {get; set;}

    }
}