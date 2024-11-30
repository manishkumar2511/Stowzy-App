using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using user_gateway.BLL.Application.Services.Account;
using user_gateway.Domain.Entities;

namespace user_gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("RoomOwnerRegistration")]
        public async Task<IActionResult> RoomOwnerRegistration([FromForm] RoomOwner roomOwner)
        {
            var result = await _accountService.RoomOwnerRegistration(roomOwner);
            return Ok(result);
        }



    }
}
