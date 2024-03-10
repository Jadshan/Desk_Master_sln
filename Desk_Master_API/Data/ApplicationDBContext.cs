using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Data
{
    public class ApplicationDBContext(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
    {
     public DbSet<Employee> EmployeesTbl {get; set;}
     public DbSet<Skills> SkillsTbl {get; set;}
     public DbSet<Experience> ExperienceTbl {get; set;}
     public DbSet<BankDetail> BankDetailsTbl {get; set;}
    }
}