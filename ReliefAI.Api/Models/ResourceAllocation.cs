using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class ResourceAllocation
{
    public int AllocationId { get; set; }

    public int ResourceId { get; set; }

    public int RequestId { get; set; }

    public int Quantity { get; set; }

    public DateTime? AllocatedAt { get; set; }

    public virtual AssistanceRequest Request { get; set; } = null!;

    public virtual Resource Resource { get; set; } = null!;
}
