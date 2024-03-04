using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.DTOs.EmployeeDTOs;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Desk_Master_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Controllers

{
    [Route("api/EmployeeFullView")]
    [ApiController]
    public class EmployeeFullViewController(IEmployeeFullViewRepository employeeRepo) : ControllerBase
    {
        private readonly IEmployeeFullViewRepository _employeeRepo = employeeRepo; 
        [HttpGet]
        public async Task<IActionResult> GetAll(){
            var employees =await _employeeRepo.GetFullViewAsync();
            var employeeViewDTOs = employees.Select(s => s.ToEmployeeFullViewDTO());
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
            return Ok(employee.ToEmployeeFullViewDTO());
         }

         [HttpPost]
         public async Task<IActionResult> AddEmployeeData([FromBody] AddEmployeeDataRequestDTO employeeDTO)
         {
             var employee =  await _employeeRepo.CreateAsync(employeeDTO);
              return CreatedAtAction(nameof(GetEmployeeById), new {id = employee.Id}, employee.ToEmployeeFullViewDTO());
         }
    }
}