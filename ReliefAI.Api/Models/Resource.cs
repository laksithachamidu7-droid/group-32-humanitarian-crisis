using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class Resource
{
    public int ResourceId { get; set; }

    public string ResourceName { get; set; } = null!;

    public string? Category { get; set; }

    public int Quantity { get; set; }

    public string? Unit { get; set; }

    public string? Location { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<ResourceAllocation> ResourceAllocations { get; set; } = new List<ResourceAllocation>();
}
