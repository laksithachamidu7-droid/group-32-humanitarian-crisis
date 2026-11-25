using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class AssistanceRequest
{
    public int RequestId { get; set; }

    public int UserId { get; set; }

    public string HelpType { get; set; } = null!;

    public string Urgency { get; set; } = null!;

    public string Location { get; set; } = null!;

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public int PeopleAffected { get; set; }

    public string? Description { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Airecommendation> Airecommendations { get; set; } = new List<Airecommendation>();

    public virtual ICollection<ResourceAllocation> ResourceAllocations { get; set; } = new List<ResourceAllocation>();

    public virtual User User { get; set; } = null!;

    public virtual ICollection<VolunteerAssignment> VolunteerAssignments { get; set; } = new List<VolunteerAssignment>();
}
