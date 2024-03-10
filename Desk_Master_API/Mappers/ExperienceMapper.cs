using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.ExperienceDTOs;
using Desk_Master_API.Models;

namespace Desk_Master_API.Mappers
{
    public static class ExperienceMapper
    {
         public static ExperienceViewDTO ToExperienceViewDTO(this Experience _experience)
        {
            return new ExperienceViewDTO
            {
                Id = _experience.Id,
                Company = _experience.Company,
                StartDate = _experience.StartDate,
                EndDate = _experience.EndDate,
                Designation = _experience.Designation,
                Project = _experience.Project,
                EmployeeId = _experience.EmployeeId
            };
        }
         public static Experience ToExperienceFromAddDTO(this AddExperienceRequestDTO requestDTO, int EmployId)
        {
            return new Experience
            {
              Company = requestDTO.Company,
              StartDate = requestDTO.StartDate,
              EndDate= requestDTO.EndDate,
              Designation = requestDTO.Designation,
              Project = requestDTO.Project,
              EmployeeId = EmployId
            };
        }
             
    }
}