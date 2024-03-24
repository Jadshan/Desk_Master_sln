using Desk_Master_API.DTOs.EmployeeDTOs;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Helpers;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;


namespace Desk_Master_API.Controllers
{
    [Route("api/Interviews")]
    [ApiController]
    public class InterviewsController(IInterviewsRepository  interviewsRepo) : ControllerBase
    {
        private readonly IInterviewsRepository _interviewsRepo = interviewsRepo;
        
        [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var interviews = await _interviewsRepo.GetAllAsync();
        var interviewViewDTOs = interviews.Select(s => s.ToInterviewViewDTO());
        return Ok(interviewViewDTOs);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetInterviewById(int id)
    {
        var interview = await _interviewsRepo.GetByIdAsync(id);
        if (interview == null)
        {
            return NotFound();
        }
        return Ok(interview.ToInterviewViewDTO());
    }

    [HttpGet("query")]
    public async Task<IActionResult> GetAllByQuery([FromQuery] QueryObj query)
    {
        var interviews = await _interviewsRepo.GetAllByQueryAsync(query);
        var interviewViewDTOs = interviews.Select(s => s.ToInterviewViewDTO());
        return Ok(interviewViewDTOs);
    }
        [HttpPost]
         public async Task<IActionResult> AddEmployeeData([FromBody] AddInterviewDataRequestDTO addInterviewData)
         {
             var _interview =  await _interviewsRepo.CreateAsync(addInterviewData);
              return CreatedAtAction(nameof(GetInterviewById), new {id = _interview.Id}, _interview.ToInterviewViewDTO());
         }

        [HttpPut]
        [Route("{id:int}")]
         public async Task<IActionResult> Update(int id, [FromBody] UpdateInterviewDTO updateInterview )
         {
            var _interview = await _interviewsRepo.UpdateAsync(id,updateInterview);
            if(_interview == null){
                return NotFound();
            }
             return CreatedAtAction(nameof(GetInterviewById), new {id = _interview.Id}, _interview.ToInterviewViewDTO());
         }

        [HttpDelete]
        [Route("{id:int}")]
         public async Task<IActionResult> Delete(int id)
         {
             var _interview = await _interviewsRepo.DeleteAsync(id);
            if (_interview == null)
            {
                return NotFound();
            }
            return NoContent();
         }


    }
}