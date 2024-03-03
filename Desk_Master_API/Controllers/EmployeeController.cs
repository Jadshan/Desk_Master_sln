using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Controllers
{
    [Route("api/Employee")]
    [ApiController]
    public class EmployeeController(ApplicationDBContext context) : ControllerBase
    {
        private readonly ApplicationDBContext _context = context;

        [HttpGet]
         public async Task<IActionResult> GetAll(){
            var employees =await _context.Employees.ToListAsync();
            var employeeViewDTOs = employees.Select(s => s.ToEmployeeViewDTO());
            return Ok(employees);
         }

         [HttpGet("{id}")]
         public async Task<IActionResult> GetEmployeeById([FromRoute] int id)
         {
            var employee = await _context.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee.ToEmployeeViewDTO());
         }

         [HttpPost]
         public async Task<IActionResult> SaveEmployee([FromBody] AddEmployRequestDTO employRequestDTO)
         {
            var employeeModel = employRequestDTO.ToEmployeeFromAddDTO();
            await _context.Employees.AddAsync(employeeModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployeeById), new {id = employeeModel.Id}, employeeModel.ToEmployeeViewDTO());
         }

         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateEmployee([FromRoute] int id,[FromBody] UpdateEmployRequestDTO updateEmployRequest)
         {
            var employeeModel = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if(employeeModel == null)
            {
                return NotFound();
            }

            employeeModel.EmpName = updateEmployRequest.EmpName;
            employeeModel.Position = updateEmployRequest.Position;
            employeeModel.Salary = updateEmployRequest.Salary;

            await _context.SaveChangesAsync();
            return Ok(employeeModel.ToEmployeeViewDTO());
         }

         [HttpDelete("{id}")]

         public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
         {
            var employeeModel = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if(employeeModel == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeeModel);
           await _context.SaveChangesAsync();
            return NoContent();
         }
    }
}