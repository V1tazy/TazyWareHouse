// CategoryRepository.cs
using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class CategoryRepository: ICategoryRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Category> GetAsync(Guid id) =>
            await _context.Category.FindAsync(id);

        public async Task<Category> AddAsync(Category item)
        {
            await _context.Category.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> UpdateAsync(Category item)
        {
            _context.Category.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task RemoveAsync(Guid id)
        {
            var entity = await GetAsync(id);
            if (entity != null)
            {
                _context.Category.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}