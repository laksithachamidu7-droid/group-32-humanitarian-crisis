using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReliefAI.Api.Data;

public class ReliefAIDbContextFactory
    : IDesignTimeDbContextFactory<ReliefAIDbContext>
{
    public ReliefAIDbContext CreateDbContext(string[] args)
    {
        var environment =
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
            ?? "Production";

        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile(
                $"appsettings.{environment}.json",
                optional: true)
            .AddEnvironmentVariables()
            .Build();

        var connectionString =
            configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "DefaultConnection is not configured.");
        }

        var optionsBuilder =
            new DbContextOptionsBuilder<ReliefAIDbContext>();

        optionsBuilder.UseSqlServer(connectionString);

        return new ReliefAIDbContext(optionsBuilder.Options);
    }
}