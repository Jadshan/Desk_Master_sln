using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.Models;

namespace Desk_Master_API.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee> CreateAsync(Employee employeeModel);
        Task<Employee?> UpdateAsync(int id, UpdateEmployRequestDTO employRequestDTO);
        Task<Employee?> DeleteAsync(int id);

    }
}