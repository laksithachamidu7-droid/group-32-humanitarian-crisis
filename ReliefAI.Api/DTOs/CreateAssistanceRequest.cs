using System.ComponentModel.DataAnnotations;

namespace ReliefAI.Api.DTOs;

public class CreateAssistanceRequest
{
    [Required]
    public string HelpType { get; set; } = string.Empty;

    [Required]
    public string Urgency { get; set; } = string.Empty;

    [Required]
    public string Location { get; set; } = string.Empty;

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    [Required]
    [Range(1, int.MaxValue)]
    public int PeopleAffected { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;
}