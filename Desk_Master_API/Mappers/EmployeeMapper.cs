using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.Models;

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
                Salary = employeeModel.Salary
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