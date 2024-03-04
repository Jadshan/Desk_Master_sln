using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.EmployeeDTOs;
using Desk_Master_API.Models;
using Desk_Master_API.DTOs.EmployeeDtos;

namespace Desk_Master_API.Mappers
{
    public static class EmployeeMapper
    {
        public static EmployeeViewDTO ToEmployeeViewDTO(this Employee employeeModel)
        {
            return new EmployeeViewDTO
            {
                Id = employeeModel.Id,
                EmpName = employeeModel.EmpName,
                Position = employeeModel.Position,
                Salary = employeeModel.Salary,            
            };
        }

         public static EmployeeFullViewDTO ToEmployeeFullViewDTO(this Employee employeeModel)
        {
            return new EmployeeFullViewDTO
            {
                Id = employeeModel.Id,
                EmpName = employeeModel.EmpName,
                Position = employeeModel.Position,
                Salary = employeeModel.Salary,
                ContactDetails = employeeModel.ContactDetails.Select(c=> c.ToContactDetailViewDTO()).ToList(),
                BankDetails = employeeModel.BankDetails.Select(b => b.ToBankDetailViewDTO()).ToList()
                
            };
        }

        public static Employee ToEmployeeFromAddDTO(this AddEmployRequestDTO requestDTO)
        {
            return new Employee
            {
                EmpName = requestDTO.EmpName,
                Position = requestDTO.Position,
                Salary = requestDTO.Salary
            };
        }
    }
}