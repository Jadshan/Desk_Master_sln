using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.ContactDtos;
using Desk_Master_API.Models;


namespace Desk_Master_API.Mappers
{
    public static class ContactDetailMapper
    {
         public static ContactDetaillViewDTO ToContactDetailViewDTO(this ContactDetail contactDetail)
        {
            return new ContactDetaillViewDTO
            {
                Id = contactDetail.Id,
                Email = contactDetail.Email,
                Address = contactDetail.Address,
                PhoneNo = contactDetail.PhoneNo,
                EmployeeId = contactDetail.EmployeeId
            };
        }

         public static ContactDetail ToContactDetailFromAddDTO(this AddContactRequestDTO requestDTO, int EmployId)
        {
            return new ContactDetail
            {
              Address = requestDTO.Address,
              PhoneNo= requestDTO.PhoneNo,
              Email = requestDTO.Email,
              EmployeeId = EmployId
            };
        }
    }
}