using System.ComponentModel.DataAnnotations;

namespace ReliefAI.Api.DTOs;

public class CreateAdminRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Phone]
    [StringLength(20)]
    public string? Phone { get; set; }

    [Required]
    [MinLength(8)]
    [StringLength(100)]
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$",
        ErrorMessage = "Password must contain uppercase, lowercase, number and special character."
    )]
    public string Password { get; set; } = string.Empty;
}