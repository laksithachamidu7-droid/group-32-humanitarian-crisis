using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TestAuthController : ControllerBase
{
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        return Ok(new
        {
            message = "You are successfully authenticated!",
            userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
            name = User.Identity?.Name,
            email = User.FindFirst(ClaimTypes.Email)?.Value,
            role = User.FindFirst(ClaimTypes.Role)?.Value
        });
    }
}