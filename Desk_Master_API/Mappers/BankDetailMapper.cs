
using Desk_Master_API.DTOs.BankDTOs;

using Desk_Master_API.Models;

namespace Desk_Master_API.Mappers
{
    public static class BankDetailMapper
    {
        public static BankDetailViewDTO ToBankDetailViewDTO(this BankDetail bankDetail)
        {
            return new BankDetailViewDTO
            {
                Id = bankDetail.Id,
                AccountHolderName = bankDetail.AccountHolderName,
                BankName = bankDetail.BankName,
                Branch = bankDetail.Branch,
                AccountNo = bankDetail.AccountNo,
                AccountType = bankDetail.AccountType,
                EmployeeId = bankDetail.EmployeeId
            };
        }
        public static BankDetail ToBankDetailFromAddDTO(this AddBankRequestDTO requestDTO, int EmployId)
        {
            return new BankDetail
            {
              AccountHolderName = requestDTO.AccountHolderName,
              BankName = requestDTO.BankName,
              Branch= requestDTO.Branch,
              AccountNo = requestDTO.AccountNo,
              AccountType = requestDTO.AccountType,
              EmployeeId = EmployId
            };
        }
    }
}