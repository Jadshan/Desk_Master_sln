using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Desk_Master_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Repository
{
    public class EmployeeRepository(ApplicationDBContext context) : IEmployeeRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<Employee> CreateAsync(Employee employeeModel)
        {
           await _context.Employees.AddAsync(employeeModel);
           await _context.SaveChangesAsync();
           return employeeModel;
        }

        public async Task<Employee?> DeleteAsync(int id)
        {
            var employeeModel = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
             if(employeeModel == null)
            {
                return null;
            }
             _context.Employees.Remove(employeeModel);
             await _context.SaveChangesAsync();
             return employeeModel;   
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
            
        }

        public async Task<Employee?> UpdateAsync(int id, UpdateEmployRequestDTO updateEmployRequest)
        {
            var employeeModel = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
             if(employeeModel == null)
            {
                return null;
            }

            employeeModel.EmpName = updateEmployRequest.EmpName;
            employeeModel.Position = updateEmployRequest.Position;
            employeeModel.Salary = updateEmployRequest.Salary;

            await _context.SaveChangesAsync();
            return employeeModel;
        }
    }
}