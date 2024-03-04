using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.EmployeeDTOs;
using Desk_Master_API.Models;

namespace Desk_Master_API.Interfaces
{
    public interface IEmployeeFullViewRepository
    {
        Task<List<Employee>> GetFullViewAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee> CreateAsync(AddEmployeeDataRequestDTO employeeModel);

    }
}