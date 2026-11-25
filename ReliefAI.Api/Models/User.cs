using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string PasswordHash { get; set; } = null!;

    public int RoleId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<AssistanceRequest> AssistanceRequests { get; set; } = new List<AssistanceRequest>();

    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual Role Role { get; set; } = null!;

    public virtual Volunteer? Volunteer { get; set; }
}
