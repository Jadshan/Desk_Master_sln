using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.EmployeeDTOs;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Desk_Master_API.Models;
using Microsoft.EntityFrameworkCore;
namespace Desk_Master_API.Repository
{
    public class EmployeeFullViewRepository(ApplicationDBContext context) : IEmployeeFullViewRepository
    {
         private readonly ApplicationDBContext _context = context;

        public async Task<Employee> CreateAsync(AddEmployeeDataRequestDTO employeeModel)
        {
            var _employeeModel= employeeModel.ToEmployeeDataFromAddDTO();
            await _context.Employees.AddAsync(_employeeModel);
            await _context.SaveChangesAsync();
              if (employeeModel.ContactDetails != null){
                var contactDetail = employeeModel.ContactDetails.ToContactDetailFromAddDTO(_employeeModel.Id);
                _context.ContactDetails.Add(contactDetail);
              }
               if (employeeModel.BankDetails != null){
                var bankDetails = employeeModel.BankDetails.ToBankDetailFromAddDTO(_employeeModel.Id);
                _context.BankDetails.Add(bankDetails);
              }
                await _context.SaveChangesAsync(); 
            
            return _employeeModel;
        }

        

        public async Task<List<Employee>> GetFullViewAsync()
        {
            return await _context.Employees
            .Include(e=> e.ContactDetails)
            .Include(e => e.BankDetails)
            .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees
            .Include(e=> e.ContactDetails)
            .Include(e => e.BankDetails)
            .FirstOrDefaultAsync(i => i.Id == id);
        }
    }
}