using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs;

using Desk_Master_API.DTOs.ContactDtos;
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
                BankName = bankDetail.BankName,
                Branch = bankDetail.Branch,
                AccountNo = bankDetail.AccountNo,
                EmployeeId = bankDetail.EmployeeId
            };
        }
              public static BankDetail ToBankDetailFromAddDTO(this AddBankRequestDTO requestDTO, int EmployId)
        {
            return new BankDetail
            {
              BankName = requestDTO.BankName,
              Branch= requestDTO.Branch,
              AccountNo = requestDTO.AccountNo,
              EmployeeId = EmployId
            };
        }
    }
}