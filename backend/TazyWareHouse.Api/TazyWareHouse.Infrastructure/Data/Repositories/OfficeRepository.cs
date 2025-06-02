using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Offices;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class OfficeRepository : IOfficeRepository
    {
        private readonly AppDbContext _context;
        public OfficeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Office> AddAsync(Office item)
        {
            _context.Offices.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Offices.AnyAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Office>> GetAllAsync()
        {
            return await _context.Offices
                .Include(o => o.Equipments)
                .ToListAsync();
        }

        public async Task<Office> GetAsync(Guid id)
        {
            return await _context.Offices.FindAsync(id);
        }

        public async Task<Office> GetByIdAsync(Guid id)
        {
            return await _context.Offices
                .Include(o => o.Equipments)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task RemoveAsync(Guid id)
        {
            var office = await _context.Offices.FindAsync(id);
            if (office != null)
            {
                _context.Offices.Remove(office);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> UpdateAsync(Office item)
        {
            _context.Offices.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
