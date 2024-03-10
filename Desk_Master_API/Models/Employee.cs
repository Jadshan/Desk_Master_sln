using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.Models
{
    public class Employee
    {
        public int Id { get; set; } 
        public string FirstName { get; set; } = string.Empty;
         public string SecondName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string ContactNo { get; set; } = string.Empty;
        public string AlternativeContactNo { get; set; } = string.Empty;
        public string PersonalEmail { get; set; } = string.Empty;
        public int TotalYears { get; set; } 
        public int TotalMonths { get; set; } 
        
        public string City { get; set; } = string.Empty;
         public string State { get; set; } = string.Empty;
        public string PinCode { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
       public string Per_City { get; set; } = string.Empty;
         public string Per_State { get; set; } = string.Empty;
        public string Per_PinCode { get; set; } = string.Empty;
        public string Per_Address { get; set; } = string.Empty;
        public List<Skills> SkillList {get; set;} = new List<Skills>();
        public List<Experience> ExperienceList {get; set;} = new List<Experience>();
        public List<BankDetail> BankDetailsList { get; set; } = new List<BankDetail>();
    }
}