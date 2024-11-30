using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using user_gateway.DAL.Infrastructure.Persistence;
using user_gateway.Domain.Entities;

namespace user_gateway.DAL.Infrastructure.Repositories.Account
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _dataContext;
        public AccountRepository(DataContext dataContext) 
        {
            _dataContext = dataContext;
        }

        public Task<bool> RoomOwnerRegistration(RoomOwner roomOwner)
        {
            throw new NotImplementedException();
        }
    }
}
