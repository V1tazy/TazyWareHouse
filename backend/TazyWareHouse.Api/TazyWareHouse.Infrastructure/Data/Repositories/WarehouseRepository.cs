using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class WarehouseRepository : IWarehouseRepository
    {
        private readonly AppDbContext _context;

        public WarehouseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Warehouse warehouse)
        {
            _context.Warehouses.Add(warehouse);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var warehouse = await _context.Warehouses.FindAsync(id);
            if (warehouse != null)
            {
                _context.Warehouses.Remove(warehouse);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Warehouse>> GetAllAsync()
        {
            return await _context.Warehouses.ToListAsync();
        }

        public async Task<Warehouse?> GetByIdAsync(int id)
        {
            return await _context.Warehouses.FindAsync(id);
        }

        public async Task<IEnumerable<Warehouse>> GetByLocationAsync(string location)
        {
            return await _context.Warehouses
                .Where(w => w.Location == location)
                .ToListAsync();
        }

        public async Task<IEnumerable<Warehouse>> GetByOccupancyRangeAsync(int minOccupancy, int maxOccupancy)
        {
            return await _context.Warehouses
                .Where(w => w.Occupancy >= minOccupancy && w.Occupancy <= maxOccupancy)
                .ToListAsync();
        }

        public async Task<IEnumerable<Warehouse>> GetByStatusAsync(string status)
        {
            return await _context.Warehouses
                .Where(w => w.Status == status)
                .ToListAsync();
        }

        public async Task<IEnumerable<Warehouse>> GetByTurnoverRateAsync(double minRate, double maxRate)
        {
            return await _context.Warehouses
                .Where(w => w.TurnoverRate >= minRate && w.TurnoverRate <= maxRate)
                .ToListAsync();
        }

        public async Task UpdateAsync(Warehouse warehouse)
        {
            _context.Warehouses.Update(warehouse);
            await _context.SaveChangesAsync();
        }
    }
}
