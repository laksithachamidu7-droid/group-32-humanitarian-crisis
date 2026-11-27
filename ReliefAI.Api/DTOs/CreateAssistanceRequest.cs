using System.ComponentModel.DataAnnotations;

namespace ReliefAI.Api.DTOs;

public class CreateAssistanceRequest
{
    [Required]
    [StringLength(100)]
    public string HelpType { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string Urgency { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Location { get; set; } = string.Empty;

    [Range(-90.0, 90.0)]
    public double? Latitude { get; set; }

    [Range(-180.0, 180.0)]
    public double? Longitude { get; set; }

    [Required]
    [Range(1, int.MaxValue)]
    public int PeopleAffected { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;
}