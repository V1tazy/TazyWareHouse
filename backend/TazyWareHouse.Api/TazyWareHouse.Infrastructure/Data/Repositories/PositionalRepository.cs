using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class PositionalRepository : IPositionalRepository
    {
        private AppDbContext _context;

        public PositionalRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Position> AddAsync(Position item)
        {
            _context.Positions.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _context.Positions.ToListAsync();
        }

        public async Task<Position> GetAsync(Guid id)
        {

            return await _context.Positions
                .FirstOrDefaultAsync(p => p.Id == id);

        }

        public async Task RemoveAsync(Guid id)
        {
            var position = await _context.Positions.FindAsync(id);

            if (position != null) {

                _context.Positions.Remove(position);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> UpdateAsync(Position item)
        {
            _context.Positions.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
