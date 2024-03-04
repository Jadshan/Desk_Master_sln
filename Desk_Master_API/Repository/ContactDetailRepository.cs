using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Data;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Desk_Master_API.Repository
{
    public class ContactDetailRepository(ApplicationDBContext context) : IContactDetailRepository
    {
        private readonly ApplicationDBContext _context = context;

      

        public async Task<List<ContactDetail>> GetAllAsync()
        {
          return await _context.ContactDetails.ToListAsync();
        }

         public async Task<ContactDetail?> GetByIdAsync(int id)
        {
          return await _context.ContactDetails.FirstOrDefaultAsync(x => x.Id == id);
        }
          public async Task<ContactDetail> CreateAsync(ContactDetail contactDetailModel)
        {
            await _context.ContactDetails.AddAsync(contactDetailModel);
            await _context.SaveChangesAsync();
            return contactDetailModel;
        }
    }
}