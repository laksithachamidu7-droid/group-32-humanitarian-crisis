using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ReliefAI.Api.Data;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ReliefAIDbContext _context;

    public AdminController(ReliefAIDbContext context)
    {
        _context = context;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users
            .Include(u => u.Role)
            .Select(u => new
            {
                u.UserId,
                u.FullName,
                u.Email,
                u.Phone,
                Role = u.Role.RoleName,
                u.CreatedAt
            })
            .ToListAsync();

        return Ok(users);
    }
}