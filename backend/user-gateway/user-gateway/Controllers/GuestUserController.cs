using Microsoft.AspNetCore.Mvc;
using System.Collections;
using user_gateway.Domain.Entities;

namespace user_gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestUserController : ControllerBase
    {
        [HttpPost("register")]
        public ActionResult Register([FromBody] GuestUser user)
        {
            if (user == null)
            {
                return BadRequest("User is null");
            }
            return Ok(new { Message = "User registered successfully", User = user });
        }
        [HttpPost("hii")]
        public ActionResult hii()
        {
            return Ok();
        }
    }

}
