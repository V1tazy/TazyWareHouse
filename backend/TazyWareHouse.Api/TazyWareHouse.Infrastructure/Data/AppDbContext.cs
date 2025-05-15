using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes;
using TazyWareHouse.Core.Models;

namespace TazyWareHouse.Infrastructure.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<CategoryStat> CategoryStats { get; set; }
        public DbSet<MonthlyData> MonthlyDatas { get; set; }
        public DbSet<EquipmentStatus> EquipmentStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Warehouse>()
                .HasMany(w => w.Categories)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Warehouse>()
                .HasMany(w => w.MonthlyData)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Warehouse>()
                .HasMany(w => w.EquipmentStatuses)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
