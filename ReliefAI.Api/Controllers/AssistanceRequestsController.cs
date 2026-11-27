using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ReliefAI.Api.Data;
using ReliefAI.Api.DTOs;
using ReliefAI.Api.Models;

namespace ReliefAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AssistanceRequestsController : ControllerBase
{
    private readonly ReliefAIDbContext _context;
    private readonly ILogger<AssistanceRequestsController> _logger;

    public AssistanceRequestsController(
        ReliefAIDbContext context,
        ILogger<AssistanceRequestsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // Victim can submit an assistance request
    [HttpPost]
    [Authorize(Roles = "Victim")]
    public async Task<IActionResult> CreateRequest(
        CreateAssistanceRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid user authentication."
            });
        }

        var assistanceRequest = new AssistanceRequest
        {
            UserId = userId,
            HelpType = request.HelpType,
            Urgency = request.Urgency,
            Location = request.Location,
            Latitude = request.Latitude.HasValue
    ? (decimal?)request.Latitude.Value
    : null,

            Longitude = request.Longitude.HasValue
    ? (decimal?)request.Longitude.Value
    : null,
            PeopleAffected = request.PeopleAffected,
            Description = request.Description,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            _context.AssistanceRequests.Add(assistanceRequest);

            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "Assistance request {RequestId} created by user {UserId}.",
                assistanceRequest.RequestId,
                userId);

            return Ok(new
            {
                message = "Assistance request submitted successfully!",
                requestId = assistanceRequest.RequestId,
                status = assistanceRequest.Status
            });
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(
                ex,
                "Failed to create assistance request for user {UserId}.",
                userId);

            return StatusCode(500, new
            {
                message = "Unable to submit the assistance request. Please try again later."
            });
        }
    }
    [HttpGet("my-requests")]
    [Authorize(Roles = "Victim")]
    public async Task<IActionResult> GetMyRequests()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid user authentication."
            });
        }

        var requests = await _context.AssistanceRequests
    .AsNoTracking()
    .Where(r => r.UserId == userId)
    .OrderByDescending(r => r.CreatedAt)
    .Select(r => new
    {
        r.RequestId,
        r.HelpType,
        r.Urgency,
        r.Location,
        r.Latitude,
        r.Longitude,
        r.PeopleAffected,
        r.Description,
        r.Status,
        r.CreatedAt
    })
    .ToListAsync();

        return Ok(requests);
    }
    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllRequests()
    {
        var requests = await _context.AssistanceRequests
    .AsNoTracking()
    .OrderByDescending(r => r.CreatedAt)
    .Select(r => new
    {
        r.RequestId,
        r.UserId,
        UserName = r.User.FullName,
        r.HelpType,
        r.Urgency,
        r.Location,
        r.Latitude,
        r.Longitude,
        r.PeopleAffected,
        r.Description,
        r.Status,
        r.CreatedAt
    })
    .ToListAsync();

        return Ok(requests);
    }
    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateRequestStatus(
    int id,
    UpdateRequestStatus request)
    {
        var assistanceRequest = await _context.AssistanceRequests
            .FirstOrDefaultAsync(r => r.RequestId == id);

        if (assistanceRequest == null)
        {
            return NotFound(new
            {
                message = "Assistance request not found."
            });
        }

        var allowedStatuses = new[]
        {
        "Pending",
        "Approved",
        "Rejected",
        "Completed"
    };

        if (string.IsNullOrWhiteSpace(request.Status) ||
    !allowedStatuses.Contains(request.Status.Trim(),
        StringComparer.OrdinalIgnoreCase))
        {
            return BadRequest(new
            {
                message = "Invalid status. Allowed statuses: Pending, Approved, Rejected, Completed."
            });
        }

        assistanceRequest.Status = allowedStatuses.First(
    s => string.Equals(s, request.Status.Trim(),
        StringComparison.OrdinalIgnoreCase));

        try
        {
            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "Assistance request {RequestId} status updated to {Status} by admin {AdminId}.",
                assistanceRequest.RequestId,
                assistanceRequest.Status,
                User.FindFirstValue(ClaimTypes.NameIdentifier));

            return Ok(new
            {
                message = "Request status updated successfully!",
                requestId = assistanceRequest.RequestId,
                status = assistanceRequest.Status
            });
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(
                ex,
                "Failed to update status for assistance request {RequestId}.",
                id);

            return StatusCode(500, new
            {
                message = "Unable to update the request status. Please try again later."
            });
        }
    }
}
