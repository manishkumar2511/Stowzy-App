using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using user_gateway.DAL.Infrastructure.Repositories.Account;
using user_gateway.Domain.Entities;

namespace user_gateway.BLL.Application.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public Task<bool> RoomOwnerRegistration(RoomOwner roomOwner)
        {
            return _accountRepository.RoomOwnerRegistration(roomOwner);
        }
    }
}
