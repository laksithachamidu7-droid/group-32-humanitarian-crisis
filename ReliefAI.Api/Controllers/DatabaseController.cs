using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ReliefAI.Api.Data;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DatabaseController : ControllerBase
{
    private readonly ReliefAIDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<DatabaseController> _logger;

    public DatabaseController(
        ReliefAIDbContext context,
        IWebHostEnvironment environment,
        ILogger<DatabaseController> logger)
    {
        _context = context;
        _environment = environment;
        _logger = logger;
    }

    [HttpGet("test")]
    public async Task<IActionResult> TestConnection()
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

        try
        {
            bool connected = await _context.Database.CanConnectAsync();

            if (connected)
            {
                return Ok(new
                {
                    message = "Successfully connected to ReliefAIDB database!"
                });
            }

            _logger.LogWarning("Database connection test failed.");

            return StatusCode(500, new
            {
                message = "Database connection failed."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Database connection test error.");

            return StatusCode(500, new
            {
                message = "Database connection error."
            });
        }
    }
}