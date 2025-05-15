using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.DashBoard;
using TazyWareHouse.Core.Entityes.Documents;
using TazyWareHouse.Core.Entityes.Equipments;
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Entityes.Warehouses;
using TazyWareHouse.Core.Offices;

namespace TazyWareHouse.Infrastructure.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }



        //Инициализация таблиц базовых


        public DbSet<Meansure> Meansures { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Category> Category { get; set; }




        //Инициализация таблиц со связями


        //Инициализация Пользовательского модуля
        public DbSet<Role> Roles { get; set; }

        public DbSet<Position> Positions { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<DashboardActivities> DashboardActivities { get; set; }
        public DbSet<DashboardTask> DashboardTasks { get; set; }

        //Инициализация продуктов и оборудования

        public DbSet<Document> Documents { get; set; }  
        public DbSet<Product> Products { get; set; }

        public DbSet<Equipment> Equipments { get; set; }

        //Инициализация помещений и их инвентарей
        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<Office> Offices { get; set; }
        public DbSet<WarehousesProductInventory> WarehousesProductInventories { get; set; }

        public DbSet<WarehouseEquipmentInventory> WarehouseEquipmentInventories { get; set; }

        public DbSet<OfficeEquipmentInventory> OfficeEquipmentInventories { get; set; }


        //Памятка для миграций: Создать миграцию Add-Migration InitialCreate
        //Добавить таблицы в бд: Update-Database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Office>()
                .HasOne(o => o.Responsible)
                .WithMany()
                .HasForeignKey(o => o.ResponsibleId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Warehouse>()
                .HasOne(o => o.Responsible)
                .WithMany()
                .HasForeignKey(o => o.ResponsibleId)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
