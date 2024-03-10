using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.SkillDTOs;
using Desk_Master_API.Models;

namespace Desk_Master_API.Mappers
{
    public static class SkillMapper
    {
         public static SkillViewDTO ToSkillViewDTO(this Skills _skillModel)
        {
            return new SkillViewDTO
            {
                Id = _skillModel.Id,
                Skill = _skillModel.Skill,
                Proficiency = _skillModel.Proficiency,
                Experience = _skillModel.Experience,
                Technology = _skillModel.Technology,
                Version = _skillModel.Version,
                CertificationFile = _skillModel.CertificationFile,
                EmployeeId = _skillModel.EmployeeId

            };
        }
          public static Skills ToSkillFromAddDTO(this AddSkillRequestDTO requestDTO, int EmployId)
        {
            return new Skills
            {
              Skill = requestDTO.Skill,
              Proficiency = requestDTO.Proficiency,
              Experience= requestDTO.Experience,
              Technology = requestDTO.Technology,
              Version = requestDTO.Version,
              CertificationFile = requestDTO.CertificationFile,
              EmployeeId = EmployId
            };
        }   
    }
}