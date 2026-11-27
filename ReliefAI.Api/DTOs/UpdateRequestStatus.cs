using System.ComponentModel.DataAnnotations;

namespace ReliefAI.Api.DTOs;

public class UpdateRequestStatus
{
    [Required]
    [StringLength(30)]
    public string Status { get; set; } = string.Empty;
}