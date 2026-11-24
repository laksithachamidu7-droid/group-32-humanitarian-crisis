using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class Airecommendation
{
    public int RecommendationId { get; set; }

    public int RequestId { get; set; }

    public string? Recommendation { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual AssistanceRequest Request { get; set; } = null!;
}
