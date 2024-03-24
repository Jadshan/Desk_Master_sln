using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Desk_Master_API.Controllers
{
    [Route("api/TimeAllocation")]
    public class TimeAllocationController(ITimeAllocationRepository timeAllocationRepo) : ControllerBase
    {
      private readonly ITimeAllocationRepository  _timeAllocationRepo = timeAllocationRepo;
        [HttpGet]
        public async Task<IActionResult> GetTimeAllocationData()
        {
            var timeAllocations = await _timeAllocationRepo.GetTimeAllocationAsync();
            var timeAllocationDTO = timeAllocations.Select(t => t.ToTimeAllocationViewDTO());
            return Ok(timeAllocationDTO);
        }

        [HttpGet]
        [Route("{id:int}")]
         public async Task<IActionResult> GetTimeAllocationById([FromRoute] int id)
         {
            var timeAllocation = await _timeAllocationRepo.GetByIdAsync(id);
            if(timeAllocation == null)
            {
                return NotFound();
            }
            return Ok(timeAllocation.ToTimeAllocationViewDTO());
         }
        [HttpPost]
         public async Task<IActionResult> AddEmployeeData([FromBody] AddTimeAllocationDTO timeAllocationDTO)
         {
             var timeAllocation =  await _timeAllocationRepo.CreateAsync(timeAllocationDTO);
              return CreatedAtAction(nameof(GetTimeAllocationById), new {id = timeAllocation.Id}, timeAllocation.ToTimeAllocationViewDTO());
         }

        [HttpPut]
        [Route("{id:int}")]
         public async Task<IActionResult> Update(int id, [FromBody] UpdateTimeAllocationDTO updatedTimeAllocation)
         {
            var timeAllocation = await _timeAllocationRepo.UpdateAsync(id,updatedTimeAllocation);
            if(timeAllocation == null){
                return NotFound();
            }
            return Ok(timeAllocation.ToTimeAllocationDTO());
         }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var timeAllocation = await _timeAllocationRepo.DeleteAsync(id);
            if (timeAllocation == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}