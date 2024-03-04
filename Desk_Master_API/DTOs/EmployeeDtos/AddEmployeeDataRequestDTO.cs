using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.ContactDtos;
using Desk_Master_API.Models;

namespace Desk_Master_API.DTOs.EmployeeDTOs
{
    public class AddEmployeeDataRequestDTO
    {
        public string EmpName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public AddContactRequestDTO? ContactDetails {get; set;}
         public AddBankRequestDTO? BankDetails { get; set; } 
       
    }
}