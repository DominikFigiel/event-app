using EventApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EventApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<City> Cities { get; set; }
        public DbSet<ZipCode> ZipCodes { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Venue> Venues { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>()
                .HasAlternateKey(c => c.Name)
                .HasName("AlternateKey_Name");   

            modelBuilder.Entity<ZipCode>()
                .HasAlternateKey(zc => zc.Code)
                .HasName("AlternateKey_Code");     

        }
    }
}