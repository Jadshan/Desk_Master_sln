using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                EmpName = requestDTO.EmpName,
                Position = requestDTO.Position,
                Salary = requestDTO.Salary
            };
        }
    }
}