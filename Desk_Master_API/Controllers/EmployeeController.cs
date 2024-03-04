using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Controllers
{
    [Route("api/Employee")]
    [ApiController]
    public class EmployeeController(IEmployeeRepository employeeRepo) : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo = employeeRepo;

        [HttpGet]
         public async Task<IActionResult> GetAll(){
            var employees =await _employeeRepo.GetAllAsync();
            var employeeViewDTOs = employees.Select(s => s.ToEmployeeViewDTO());
            return Ok(employeeViewDTOs);
         }

         [HttpGet("{id}")]
         public async Task<IActionResult> GetEmployeeById([FromRoute] int id)
         {
            var employee = await _employeeRepo.GetByIdAsync(id);
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
            await _employeeRepo.CreateAsync(employeeModel);
            return CreatedAtAction(nameof(GetEmployeeById), new {id = employeeModel.Id}, employeeModel.ToEmployeeViewDTO());
         }

         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateEmployee([FromRoute] int id,[FromBody] UpdateEmployRequestDTO updateEmployRequest)
         {
            var employeeModel = await _employeeRepo.UpdateAsync(id, updateEmployRequest);
            if(employeeModel == null)
            {
                return NotFound();
            }
            return Ok(employeeModel.ToEmployeeViewDTO());
         }

         [HttpDelete("{id}")]

         public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
         {
           var employeeModel = await _employeeRepo.DeleteAsync(id);
           if(employeeModel == null)
           {
            return NotFound();
           }
            return NoContent();
         }
    }
}