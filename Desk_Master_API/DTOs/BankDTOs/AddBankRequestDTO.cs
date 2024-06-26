using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Desk_Master_API.DTOs.BankDTOs
{
    public class AddBankRequestDTO
    {
        public string AccountHolderName {get; set;} = string.Empty;
        public string BankName { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public string AccountNo { get; set; } = string.Empty;
        public string AccountType { get; set; } = string.Empty;
    }
}