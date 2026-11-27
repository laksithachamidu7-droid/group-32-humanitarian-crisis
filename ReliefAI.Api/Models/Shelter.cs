using System;
using System.Collections.Generic;

namespace ReliefAI.Api.Models;

public partial class Shelter
{
    public int ShelterId { get; set; }

    public string ShelterName { get; set; } = null!;

    public string Location { get; set; } = null!;

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public int Capacity { get; set; }

    public int CurrentOccupancy { get; set; }
}
