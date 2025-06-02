// MeansureRepository.cs
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces.Repository;


namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class MeansureRepository : IMeansureRepository
    {
        private readonly AppDbContext _context;
        public MeansureRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Meansure> GetAsync(Guid id) =>
            await _context.Meansures.FindAsync(id);

        public async Task<Meansure> AddAsync(Meansure item)
        {
            await _context.Meansures.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> UpdateAsync(Meansure item)
        {
            _context.Meansures.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task RemoveAsync(Guid id)
        {
            var entity = await GetAsync(id);
            if (entity != null)
            {
                _context.Meansures.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}