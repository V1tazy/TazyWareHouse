// SupplierRepository.cs
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces.Repository;


namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly AppDbContext _context;
        public SupplierRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Supplier> GetAsync(Guid id) =>
            await _context.Suppliers.FindAsync(id);

        public async Task<Supplier> AddAsync(Supplier item)
        {
            await _context.Suppliers.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> UpdateAsync(Supplier item)
        {
            _context.Suppliers.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task RemoveAsync(Guid id)
        {
            var entity = await GetAsync(id);
            if (entity != null)
            {
                _context.Suppliers.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}