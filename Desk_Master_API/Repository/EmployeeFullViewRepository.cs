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
         public async Task<List<Employee>> GetFullViewAsync()
        {
            return await _context.EmployeesTbl 
             .Include(e => e.BankDetailsList) 
            .Include(e => e.ExperienceList)
             .Include(e => e.SkillList)
            .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.EmployeesTbl
            .Include(e => e.BankDetailsList)
              .Include(e => e.ExperienceList)
             .Include(e => e.SkillList)
            .FirstOrDefaultAsync(i => i.Id == id);
        }
        public async Task<Employee> CreateAsync(AddEmployeeDataRequestDTO employeeModel)
        {
            var _employeeModel= employeeModel.ToEmployeeDataFromAddDTO();
            await _context.EmployeesTbl.AddAsync(_employeeModel);
            await _context.SaveChangesAsync();
            
               employeeModel.BankDetails?.ForEach(bank =>{
                     var bankDetails = bank.ToBankDetailFromAddDTO(_employeeModel.Id);
                _context.BankDetailsTbl.Add(bankDetails);
                });
                 employeeModel.Experience?.ForEach(exp =>{
                     var experience = exp.ToExperienceFromAddDTO(_employeeModel.Id);
                _context.ExperienceTbl.Add(experience);
                });
                 employeeModel.Skill?.ForEach(skill =>{
                     var _skill = skill.ToSkillFromAddDTO(_employeeModel.Id);
                _context.SkillsTbl.Add(_skill);
                });
                await _context.SaveChangesAsync(); 
            
            return _employeeModel;
        }     

       
    }
}