using Microsoft.EntityFrameworkCore;
using TechStoreAPI.Models;

namespace TechStoreAPI.Data
{
    // Separate DbContext for OCS Inventory database (read-only)
    public class OcsDbContext : DbContext
    {
        public OcsDbContext(DbContextOptions<OcsDbContext> options)
            : base(options)
        {
        }

        public DbSet<OcsInventoryItem> OcsInventoryItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map to OCS Inventory table - adjust table name based on your schema
            modelBuilder.Entity<OcsInventoryItem>()
                .ToTable("hardware"); // Common OCS Inventory table name
        }
    }
}
