using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Data
{
    public class ApplicationDBContext: DbContext
    {
     public ApplicationDBContext(DbContextOptions dbContextOptions)
     : base(dbContextOptions)
     {
        
     }   

     public DbSet<Employee> Employees {get; set;}
     public DbSet<ContactDetail> ContactDetails {get; set;}
     public DbSet<BankDetail> BankDetails {get; set;}
    }
}