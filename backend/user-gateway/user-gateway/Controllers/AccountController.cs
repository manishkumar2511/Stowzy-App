using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using user_gateway.BLL.Application.Services.Account;
using user_gateway.BLL.Application.Services.Account.DTOs;
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

        //[HttpPost("roomOwnerRegistration")]
        //public async Task<IActionResult> RoomOwnerRegistration([FromBody] RoomOwnerRegistrationDTO roomOwnerRegistration)
        //{
        //    if (roomOwnerRegistration == null)
        //    {
        //        return BadRequest("Invalid payload");
        //    }

        //    // Debugging the data received
        //    Console.WriteLine($"Room Owner: {roomOwnerRegistration.roomOwner}");
        //    Console.WriteLine($"Room: {roomOwnerRegistration.room}");
        //    Console.WriteLine($"Documents: {roomOwnerRegistration.stowzyDocuments}");

        //    return Ok("Data received");
        //}

        [HttpPost("roomOwnerRegistration")]
        public async Task<IActionResult> RoomOwnerRegistration([FromForm] RoomOwnerRegistrationDTO roomOwnerRegistration)
        {
            // Debugging to check received data
            Console.WriteLine($"Room Owner: {roomOwnerRegistration.roomOwner?.FirstName}");
            Console.WriteLine($"Room: {roomOwnerRegistration.room?.BusinessName}");
            Console.WriteLine($"Document ID: {roomOwnerRegistration.stowzyDocuments?.DocumentId}");

            if (roomOwnerRegistration.stowzyDocuments?.IdentityProofDocument != null)
            {
                var fileName = Path.GetFileName(roomOwnerRegistration.stowzyDocuments.IdentityProofDocument.FileName);
                Console.WriteLine($"Received file: {fileName}");
            }

            if (roomOwnerRegistration.stowzyDocuments?.StowzyImages != null)
            {
                foreach (var imageName in roomOwnerRegistration.stowzyDocuments.StowzyImages)
                {
                    Console.WriteLine($"Image: {imageName}");
                }
            }

            return Ok("Data received successfully");
        }





    }
}
