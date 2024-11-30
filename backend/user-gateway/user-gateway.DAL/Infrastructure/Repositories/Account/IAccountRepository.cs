using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using user_gateway.Domain.Entities;

namespace user_gateway.DAL.Infrastructure.Repositories.Account
{
    public interface IAccountRepository
    {
        Task<bool> RoomOwnerRegistration(RoomOwner roomOwner);
    }
}
