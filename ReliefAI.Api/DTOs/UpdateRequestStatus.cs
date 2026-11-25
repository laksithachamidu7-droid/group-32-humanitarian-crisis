using System.ComponentModel.DataAnnotations;

namespace ReliefAI.Api.DTOs;

public class UpdateRequestStatus
{
    [Required]
    public string Status { get; set; } = string.Empty;
}