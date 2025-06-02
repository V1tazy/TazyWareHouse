using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces.Repository;
using TazyWareHouse.Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;
    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Product> GetAsync(Guid id) =>
        await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Include(p => p.Meansure)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<Product>> GetAllAsync() =>
        await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Include(p => p.Meansure)
            .ToListAsync();

    public async Task<Product> AddAsync(Product item)
    {
        await _context.Products.AddAsync(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<bool> UpdateAsync(Product item)
    {
        _context.Products.Update(item);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task RemoveAsync(Guid id)
    {
        var product = await GetAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}