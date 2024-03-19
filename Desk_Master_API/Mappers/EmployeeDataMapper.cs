using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.DTOs.EmployeeDTOs;
using Desk_Master_API.Models;

namespace Desk_Master_API.Mappers
{
    public static class EmployeeDataMapper
    {
         public static Employee ToEmployeeDataFromAddDTO(this AddEmployeeDataRequestDTO requestDTO)
        {
            return new Employee
            {
             FirstName = requestDTO.FirstName,
             SecondName = requestDTO.SecondName,
             Email = requestDTO.Email,
             Designation = requestDTO.Designation,
             Role = requestDTO.Role,
             ContactNo = requestDTO.ContactNo,
             AlternativeContactNo = requestDTO.AlternativeContactNo,
             PersonalEmail = requestDTO.PersonalEmail,
             TotalYears = requestDTO.TotalYears,
             TotalMonths = requestDTO.TotalMonths,
             City = requestDTO.CurrentAddress.City,
             State = requestDTO.CurrentAddress.State,
             PinCode = requestDTO.CurrentAddress.PinCode,
             Address = requestDTO.CurrentAddress.Address,
             Per_City = requestDTO.PermanentAddress.City,
             Per_State = requestDTO.PermanentAddress.State,
             Per_PinCode = requestDTO.PermanentAddress.PinCode,
             Per_Address = requestDTO.PermanentAddress.Address,
            };
        }
    
        public static EmployeeFullViewDTO ToEmployeeFullViewDTO(this Employee employeeModel)
        {
            return new EmployeeFullViewDTO
            {
                BasicDetails = {Id = employeeModel.Id,
                FirstName = employeeModel.FirstName,
                SecondName = employeeModel.SecondName,
                Email = employeeModel.Email,
                Designation = employeeModel.Designation,
                Role = employeeModel.Role,
                ContactNo = employeeModel.ContactNo,
                AlternativeContactNo = employeeModel.AlternativeContactNo,
                PersonalEmail = employeeModel.PersonalEmail,
                TotalYears =employeeModel.TotalYears,
                TotalMonths = employeeModel.TotalMonths,
                CurrentAddress = {
                City = employeeModel.City,
                State = employeeModel.State,
                PinCode = employeeModel.PinCode,
                Address = employeeModel.Address,
                },
                PermanentAddress = {
                City = employeeModel.Per_City,
                State = employeeModel.Per_State,
                PinCode = employeeModel.Per_PinCode,
                Address = employeeModel.Per_Address,
                },     
                },
                 BankDetails = employeeModel.BankDetailsList.Select(b => b.ToBankDetailViewDTO()).ToList(),
                Experience = employeeModel.ExperienceList.Select(b => b.ToExperienceViewDTO()).ToList(),
                Skill = employeeModel.SkillList.Select(b => b.ToSkillViewDTO()).ToList()
            };
        }
    }
}