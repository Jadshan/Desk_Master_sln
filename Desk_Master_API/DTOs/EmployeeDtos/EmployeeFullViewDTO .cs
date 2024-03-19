using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.DTOs.BankDTOs;
using Desk_Master_API.DTOs.ExperienceDTOs;
using Desk_Master_API.DTOs.SkillDTOs;
using Desk_Master_API.Models;


namespace Desk_Master_API.DTOs.EmployeeDtos
{
    public class EmployeeFullViewDTO
    {
       public  BasicDetails BasicDetails {get; set;} = new BasicDetails();
        public List<BankDetailViewDTO>? BankDetails {get; set;}
        public List<ExperienceViewDTO>? Experience {get; set;}
        public List<SkillViewDTO>? Skill {get; set;}

    }
}