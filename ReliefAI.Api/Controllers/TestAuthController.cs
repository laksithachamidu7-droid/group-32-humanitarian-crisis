using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TestAuthController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    public TestAuthController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

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