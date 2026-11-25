using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class Volunteer
{
    public int VolunteerId { get; set; }

    public int UserId { get; set; }

    public string? Skills { get; set; }

    public string? Availability { get; set; }

    public string? Location { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<VolunteerAssignment> VolunteerAssignments { get; set; } = new List<VolunteerAssignment>();
}
