using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.ContactDtos;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Desk_Master_API.Controllers
{
    [Route("api/ContactDetail")]
    [ApiController]
    public class ContactDetailController(IContactDetailRepository contactRepo, IEmployeeRepository employeeRepo)  : ControllerBase
    {
        private readonly IContactDetailRepository _contactRepo = contactRepo;
        private readonly IEmployeeRepository _employeeRepo = employeeRepo;


         [HttpGet]
        public async Task<IActionResult> GetAll(){
            var contactDetails = await _contactRepo.GetAllAsync();
            var contactDetailViewDTOs = contactDetails.Select(s => s.ToContactDetailViewDTO());

            return Ok(contactDetails);
        }  

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var contactDetail = await _contactRepo.GetByIdAsync(id);
            if(contactDetail == null)
            {
                return NotFound();
            }
            return Ok(contactDetail.ToContactDetailViewDTO());
        }

        [HttpPost("{EmployId}")]
        public async Task<IActionResult> CreateContact([FromRoute] int EmployId,[FromBody] AddContactRequestDTO addContactRequestDTO)
        {
           if(!await _employeeRepo.EmployeeExists(EmployId))
           {
                return BadRequest("Employ does not exist!");
           }
            var contactModel = addContactRequestDTO.ToContactDetailFromAddDTO(EmployId);
            await _contactRepo.CreateAsync(contactModel);
            return CreatedAtAction(nameof(GetById), new {id = contactModel.Id}, contactModel.ToContactDetailViewDTO());
        }
    }

   
}