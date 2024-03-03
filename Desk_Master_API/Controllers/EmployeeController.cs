using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.DTOs.EmployeeDtos;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace Desk_Master_API.Controllers
{
    [Route("api/Employee")]
    [ApiController]
    public class EmployeeController: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public EmployeeController(ApplicationDBContext context)
        {
            _context = context;
        }

         [HttpGet]
         public IActionResult GetAll(){
            var employees = _context.Employees.ToList()
            .Select(s => s.ToEmployeeViewDTO());
            return Ok(employees);
         }

         [HttpGet("{id}")]
         public IActionResult GetEmployeeById([FromRoute] int id)
         {
            var employee = _context.Employees.Find(id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee.ToEmployeeViewDTO());
         }

         [HttpPost]
         public IActionResult SaveEmployee([FromBody] AddEmployRequestDTO employRequestDTO)
         {
            var employeeModel = employRequestDTO.ToEmployeeFromAddDTO();
            _context.Employees.Add(employeeModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEmployeeById), new {id = employeeModel.Id}, employeeModel.ToEmployeeViewDTO());
         }

         [HttpPut("{id}")]

         public IActionResult UpdateEmployee([FromRoute] int id,[FromBody] UpdateEmployRequestDTO updateEmployRequest)
         {
            var employeeModel = _context.Employees.FirstOrDefault(x => x.Id == id);
            if(employeeModel == null)
            {
                return NotFound();
            }

            employeeModel.EmpName = updateEmployRequest.EmpName;
            employeeModel.Position = updateEmployRequest.Position;
            employeeModel.Salary = updateEmployRequest.Salary;

            _context.SaveChanges();
            return Ok(employeeModel.ToEmployeeViewDTO());
         }

         [HttpDelete("{id}")]

         public IActionResult DeleteEmployee([FromRoute] int id)
         {
            var employeeModel = _context.Employees.FirstOrDefault(x => x.Id == id);
            if(employeeModel == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeeModel);
            _context.SaveChanges();
            return NoContent();
         }
    }
}