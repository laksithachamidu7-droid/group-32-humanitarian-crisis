using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReliefAI.Api.Data;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly ReliefAIDbContext _context;

    public DatabaseController(ReliefAIDbContext context)
    {
        _context = context;
    }

    [HttpGet("test")]
    public async Task<IActionResult> TestConnection()
    {
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

            return StatusCode(500, new
            {
                message = "Database connection failed."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Database connection error.",
                error = ex.Message
            });
        }
    }
}