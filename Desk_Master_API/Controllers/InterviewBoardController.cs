using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.InterviewBoardDTOs;
using Desk_Master_API.DTOs.InterviewDTOs;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace Desk_Master_API.Controllers
{
    [Route("api/InterviewBoard")]
    public class InterviewBoardController(IInterviewBoardRepository boardRepository ) : ControllerBase
    {
      private readonly IInterviewBoardRepository  _boardRepository = boardRepository;
        [HttpGet]
        public async Task<IActionResult> GetAll(){
            var interviewBoards =await _boardRepository.GetAllAsync();
               var groupedByDate = interviewBoards
            .GroupBy(interview => interview.Date.Date)
            .Select(group => new
            {
                Date = group.Key,
                Interviewers = group.Select(interview => new
                {
                    InterviewerId = interview.Id,
                    Name = interview.Interviewer,
                    Role = interview.InterviewerRole
                }).ToList()
            })
            .ToList();
           // var employeeViewDTOs = interviewBoards.Select(s => s.ToInterviewBoardView(interviewBoards));
            return Ok(groupedByDate);
         } 

         [HttpPost]
         public async Task<IActionResult> AddInterviewBoardData([FromBody] AddInterviewBoardDTO addInterviewBoard)
         {
             var addedInterviewBoard =  await _boardRepository.CreateAsync(addInterviewBoard);
          
            return Ok(addedInterviewBoard);
         }
    }
}