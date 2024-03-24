

namespace Desk_Master_API.DTOs.BankDTOs
{
    public class BankDetailViewDTO
    {
        public int Id { get; set; }
        public string AccountHolderName {get; set;} = string.Empty;
        public string BankName { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public string AccountNo { get; set; } = string.Empty;
        public string AccountType { get; set; } = string.Empty;
        public int? EmployeeId { get; set; }
    }
}