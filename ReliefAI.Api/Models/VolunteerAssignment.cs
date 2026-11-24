using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class VolunteerAssignment
{
    public int AssignmentId { get; set; }

    public int VolunteerId { get; set; }

    public int? RequestId { get; set; }

    public string? TaskDescription { get; set; }

    public string? Status { get; set; }

    public DateTime? AssignedAt { get; set; }

    public virtual AssistanceRequest? Request { get; set; }

    public virtual Volunteer Volunteer { get; set; } = null!;
}
