using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Desk_Master_API.Models;

namespace Desk_Master_API.Interfaces
{
    public interface IContactDetailRepository
    {
          Task<List<ContactDetail>> GetAllAsync();

          Task<ContactDetail?> GetByIdAsync(int id);

          Task<ContactDetail> CreateAsync(ContactDetail contactDetailModel);
    }
}