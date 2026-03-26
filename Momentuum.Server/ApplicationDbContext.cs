using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Momentuum.Server.Models;

namespace Momentuum.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Microsoft.AspNetCore.Identity.IdentityRole<long>, long>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Models.Task> Tasks { get; set; } = null!;
        public DbSet<Habit> Habits { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<TaskCategory> TaskCategories { get; set; } = null!;
        public DbSet<HabitCategory> HabitCategories { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TaskCategory>()
                .HasKey(tc => new { tc.TaskId, tc.CategoryId });
            modelBuilder.Entity<HabitCategory>()
                .HasKey(hc => new { hc.HabitId, hc.CategoryId });
            modelBuilder.Entity<Models.Task>().HasQueryFilter(t => !t.isArchived);
        }

    }
}