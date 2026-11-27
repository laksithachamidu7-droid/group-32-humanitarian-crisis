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

    // Get all users
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

    // Promote a user to Admin
    [HttpPut("users/{userId}/promote-admin")]
    public async Task<IActionResult> PromoteToAdmin(int userId)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null)
        {
            return NotFound(new
            {
                message = "User not found."
            });
        }

        if (user.Role.RoleName == "Admin")
        {
            return BadRequest(new
            {
                message = "User is already an Admin."
            });
        }

        var adminRole = await _context.Roles
            .FirstOrDefaultAsync(r => r.RoleName == "Admin");

        if (adminRole == null)
        {
            return StatusCode(500, new
            {
                message = "Admin role not found."
            });
        }

        user.RoleId = adminRole.RoleId;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "User successfully promoted to Admin.",
            userId = user.UserId,
            fullName = user.FullName,
            email = user.Email,
            role = "Admin"
        });
    }
    // Remove Admin Role
    [HttpPut("users/{userId}/remove-admin")]
    public async Task<IActionResult> RemoveAdmin(int userId)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        if (user.Role.RoleName != "Admin")
        {
            return BadRequest(new { message = "User is not an Admin." });
        }

        var currentUserId = int.Parse(
            User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value
        );

        if (user.UserId == currentUserId)
        {
            return BadRequest(new { message = "You cannot remove your own Admin role." });
        }

        var adminCount = await _context.Users
            .Include(u => u.Role)
            .CountAsync(u => u.Role.RoleName == "Admin");

        if (adminCount <= 1)
        {
            return BadRequest(new { message = "At least one Admin must remain in the system." });
        }

        var victimRole = await _context.Roles
            .FirstOrDefaultAsync(r => r.RoleName == "Victim");

        if (victimRole == null)
        {
            return StatusCode(500, new { message = "Victim role not found." });
        }

        user.RoleId = victimRole.RoleId;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Admin role successfully removed.",
            userId = user.UserId,
            fullName = user.FullName,
            email = user.Email,
            role = "Victim"
        });
    }
}
