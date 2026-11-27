using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ReliefAI.Api.Models;

namespace ReliefAI.Api.Data;

public partial class ReliefAIDbContext : DbContext
{
    public ReliefAIDbContext(DbContextOptions<ReliefAIDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Airecommendation> Airecommendations { get; set; }

    public virtual DbSet<AssistanceRequest> AssistanceRequests { get; set; }

    public virtual DbSet<AuditLog> AuditLogs { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Resource> Resources { get; set; }

    public virtual DbSet<ResourceAllocation> ResourceAllocations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Shelter> Shelters { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Volunteer> Volunteers { get; set; }

    public virtual DbSet<VolunteerAssignment> VolunteerAssignments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Airecommendation>(entity =>
        {
            entity.HasKey(e => e.RecommendationId).HasName("PK__AIRecomm__AA15BEE4118F5E7F");

            entity.ToTable("AIRecommendations");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Request).WithMany(p => p.Airecommendations)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AIRecomme__Reque__6D0D32F4");
        });

        modelBuilder.Entity<AssistanceRequest>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Assistan__33A8517AF6EBBCC3");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.HelpType).HasMaxLength(100);
            entity.Property(e => e.Latitude).HasColumnType("decimal(10, 7)");
            entity.Property(e => e.Location).HasMaxLength(200);
            entity.Property(e => e.Longitude).HasColumnType("decimal(10, 7)");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Pending");
            entity.Property(e => e.Urgency).HasMaxLength(30);

            entity.HasOne(d => d.User).WithMany(p => p.AssistanceRequests)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Assistanc__UserI__5441852A");
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__AuditLog__5E548648DD141B62");

            entity.Property(e => e.Action).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.User).WithMany(p => p.AuditLogs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__AuditLogs__UserI__75A278F5");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E12DDCD2542");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsRead).HasDefaultValue(false);
            entity.Property(e => e.Message).HasMaxLength(500);

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Notificat__UserI__71D1E811");
        });

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.HasKey(e => e.ResourceId).HasName("PK__Resource__4ED1816FCF7CB235");

            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Location).HasMaxLength(200);
            entity.Property(e => e.ResourceName).HasMaxLength(100);

            // Updated: Default Quantity = 0
            entity.Property(e => e.Quantity).HasDefaultValue(0);

            entity.Property(e => e.Unit).HasMaxLength(30);
        });

        modelBuilder.Entity<ResourceAllocation>(entity =>
        {
            entity.HasKey(e => e.AllocationId).HasName("PK__Resource__B3C6D64B49501BFD");

            entity.Property(e => e.AllocatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Request).WithMany(p => p.ResourceAllocations)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ResourceA__Reque__6383C8BA");

            entity.HasOne(d => d.Resource).WithMany(p => p.ResourceAllocations)
                .HasForeignKey(d => d.ResourceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ResourceA__Resou__628FA481");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1ACD562660");

            entity.HasIndex(e => e.RoleName, "UQ__Roles__8A2B6160B429D656").IsUnique();

            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<Shelter>(entity =>
        {
            entity.HasKey(e => e.ShelterId).HasName("PK__Shelters__E2CDF554A856B10F");

            entity.Property(e => e.CurrentOccupancy).HasDefaultValue(0);
            entity.Property(e => e.Latitude).HasColumnType("decimal(10, 7)");
            entity.Property(e => e.Location).HasMaxLength(200);
            entity.Property(e => e.Longitude).HasColumnType("decimal(10, 7)");
            entity.Property(e => e.ShelterName).HasMaxLength(150);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C402FFF72");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D1053467587A4D").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(20);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Users__RoleId__4F7CD00D");
        });

        modelBuilder.Entity<Volunteer>(entity =>
        {
            entity.HasKey(e => e.VolunteerId).HasName("PK__Voluntee__716F6F2CD6C18442");

            entity.HasIndex(e => e.UserId, "UQ__Voluntee__1788CC4D43F6966A").IsUnique();

            entity.Property(e => e.Availability).HasMaxLength(50);
            entity.Property(e => e.Location).HasMaxLength(200);
            entity.Property(e => e.Skills).HasMaxLength(300);

            entity.HasOne(d => d.User).WithOne(p => p.Volunteer)
                .HasForeignKey<Volunteer>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Volunteer__UserI__5EBF139D");
        });

        modelBuilder.Entity<VolunteerAssignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PK__Voluntee__32499E7767F6B5FD");

            entity.Property(e => e.AssignedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Assigned");
            entity.Property(e => e.TaskDescription).HasMaxLength(500);

            entity.HasOne(d => d.Request).WithMany(p => p.VolunteerAssignments)
                .HasForeignKey(d => d.RequestId)
                .HasConstraintName("FK__Volunteer__Reque__693CA210");

            entity.HasOne(d => d.Volunteer).WithMany(p => p.VolunteerAssignments)
                .HasForeignKey(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Volunteer__Volun__68487DD7");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}