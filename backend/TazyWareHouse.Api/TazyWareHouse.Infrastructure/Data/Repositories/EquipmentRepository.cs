using Microsoft.EntityFrameworkCore;

using TazyWareHouse.Core.Entityes.Equipments;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    class EquipmentRepository: IEquimentRepository
    {
        private readonly AppDbContext _context;

        public EquipmentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Equipment> AddAsync(Equipment item)
        {
            _context.Equipments.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<IEnumerable<Equipment>> GetAllAsync()
        {
            return await _context.Equipments.ToListAsync();
        }

        public async Task<Equipment> GetAsync(Guid id)
        {
            return await _context.Equipments
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Equipment> GetByIdAsync(Guid id)
        {
            return await _context.Equipments
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public Task RemoveAsync(Guid id)
        {
            var equipment = _context.Equipments.Find(id);

            if (equipment != null)
            {
                _context.Equipments.Remove(equipment);
                return _context.SaveChangesAsync();
            }
            return Task.CompletedTask;
        }

        public async Task<bool> UpdateAsync(Equipment item)
        {
            if(_context.Equipments.Find(item.Id) == null)
            {
                return false;
            }


            _context.Equipments.Update(item);
            var result = await _context.SaveChangesAsync() > 0;


            return result;
        }
        public async Task<IEnumerable<Equipment>> GetByCategoryAsync(Guid categoryId)
        {
            return await _context.Equipments
                .AsNoTracking()
                .Where(e => e.Category != null && e.Category.Id == categoryId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Equipment>> GetByStatusAsync(string status)
        {
            return await _context.Equipments
                .AsNoTracking()
                .Where(e => e.Status == status)
                .ToListAsync();
        }

        public async Task<Equipment> GetBySerialNumberAsync(string serialNumber)
        {
            return await _context.Equipments
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.SerialNumber == serialNumber);
        }
    }
}
