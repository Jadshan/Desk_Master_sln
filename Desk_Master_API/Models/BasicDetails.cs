using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.Models
{
    public class BasicDetails
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
        public  AddressModel CurrentAddress {get; set;} = new AddressModel();
        public  AddressModel PermanentAddress {get; set;} = new AddressModel();
    }
}