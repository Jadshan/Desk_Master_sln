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
        public string EmpName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        [Column(TypeName = "decimal(20,2)")]
        public decimal Salary { get; set; }
        public List<ContactDetail> ContactDetails {get; set;} = [];
        public List<BankDetail> BankDetails { get; set; } = [];
    }
}