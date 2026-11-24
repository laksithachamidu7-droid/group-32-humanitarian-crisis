using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class AuditLog
{
    public int LogId { get; set; }

    public int? UserId { get; set; }

    public string Action { get; set; } = null!;

    public string? Details { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? User { get; set; }
}
