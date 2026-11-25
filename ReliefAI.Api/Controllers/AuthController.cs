using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReliefAI.Api.Data;
using ReliefAI.Api.DTOs;
using ReliefAI.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ReliefAIDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AuthController(
    ReliefAIDbContext context,
    IPasswordHasher<User> passwordHasher,
    IConfiguration configuration)
{
    _context = context;
    _passwordHasher = passwordHasher;
    _configuration = configuration;
}

    [HttpPost("register")]
public async Task<IActionResult> Register(RegisterRequest request)
{
    var email = request.Email.Trim();

    var existingUser = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);

    if (existingUser != null)
    {
        return Conflict(new { message = "Email already registered." });
    }

    // Allow only Victim, Volunteer and Donor roles
    var allowedRoles = new[] { "Victim", "Volunteer", "Donor" };

    var selectedRole = allowedRoles.FirstOrDefault(
        r => r.Equals(request.Role.Trim(), StringComparison.OrdinalIgnoreCase)
    );

    if (selectedRole == null)
    {
        return BadRequest(new
        {
            message = "Invalid role. Allowed roles: Victim, Volunteer, Donor."
        });
    }

    var role = await _context.Roles
        .FirstOrDefaultAsync(r => r.RoleName == selectedRole);

    if (role == null)
    {
        return StatusCode(500, new
        {
            message = "Selected role not found in database."
        });
    }

    var user = new User
    {
        FullName = request.FullName.Trim(),
        Email = email,
        Phone = request.Phone,
        RoleId = role.RoleId
    };

    user.PasswordHash = _passwordHasher.HashPassword(
        user,
        request.Password
    );

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Registration successful!",
        userId = user.UserId,
        fullName = user.FullName,
        email = user.Email,
        role = role.RoleName
    });
}
    [HttpPost("login")]
public async Task<IActionResult> Login(LoginRequest request)
{
    var email = request.Email.Trim();

    var user = await _context.Users
        .Include(u => u.Role)
        .FirstOrDefaultAsync(u => u.Email == email);

    if (user == null)
    {
        return Unauthorized(new
        {
            message = "Invalid email or password."
        });
    }

    var verification = _passwordHasher.VerifyHashedPassword(
        user,
        user.PasswordHash,
        request.Password
    );

    if (verification == PasswordVerificationResult.Failed)
    {
        return Unauthorized(new
        {
            message = "Invalid email or password."
        });
    }

    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Name, user.FullName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.RoleName)
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!)
    );

    var credentials = new SigningCredentials(
        key,
        SecurityAlgorithms.HmacSha256
    );

    var expiryMinutes = int.TryParse(
        _configuration["Jwt:ExpiryMinutes"],
        out var minutes
    ) ? minutes : 60;

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
        signingCredentials: credentials
    );

    return Ok(new
    {
        message = "Login successful!",
        token = new JwtSecurityTokenHandler().WriteToken(token),
        expiresAt = token.ValidTo,
        user = new
        {
            user.UserId,
            user.FullName,
            user.Email,
            role = user.Role.RoleName
        }
    });
}
[HttpPost("setup-admin")]
public async Task<IActionResult> SetupAdmin(CreateAdminRequest request)
{
    // Check whether an admin already exists
    bool adminExists = await _context.Users
        .AnyAsync(u => u.Role.RoleName == "Admin");

    if (adminExists)
    {
        return BadRequest(new
        {
            message = "An admin account already exists."
        });
    }

    var email = request.Email.Trim();

    var existingUser = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);

    if (existingUser != null)
    {
        return Conflict(new
        {
            message = "Email already registered."
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

    var admin = new User
    {
        FullName = request.FullName.Trim(),
        Email = email,
        Phone = request.Phone,
        RoleId = adminRole.RoleId
    };

    admin.PasswordHash = _passwordHasher.HashPassword(
        admin,
        request.Password
    );

    _context.Users.Add(admin);
    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Admin account created successfully!",
        userId = admin.UserId,
        fullName = admin.FullName,
        email = admin.Email,
        role = adminRole.RoleName
    });
}
}