using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Offices;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class OfficeEquipmentInventoryRepository : IOfficeEquipmentInventoryRepository
    {
        private readonly AppDbContext _context;

        public OfficeEquipmentInventoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<OfficeEquipmentInventory> AddAsync(OfficeEquipmentInventory item)
        {
            _context.OfficeEquipmentInventories.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<OfficeEquipmentInventory> GetAsync(Guid id)
        {
            var result = await _context.OfficeEquipmentInventories.FirstOrDefaultAsync(x => x.Id == id);


            if (result == null) 
            {
                throw new ArgumentException("OfficeEquipmentDontExist");
            }

            return result;
        }

        public async Task<OfficeEquipmentInventory> GetByOfficeAndEquipmentIdAsync(Guid officeId, Guid equipmentId)
        {
            var result = await _context.OfficeEquipmentInventories
                .Include(x => x.Office)
                .Include(x => x.Equipment)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Office.Id == officeId && x.Equipment.Id == equipmentId);

            if (result == null)
                SendNotFoundMessage();

            return result;
        }

        public async Task<IEnumerable<OfficeEquipmentInventory>> GetByOfficeIdAsync(Guid officeId)
        {
            var result = await _context.OfficeEquipmentInventories
                .Include(x => x.Office)
                .Include(x => x.Equipment)
                .Include(x => x.User)
                .Where(officeInventory => officeInventory.Id == officeId)
                .ToListAsync();

            if (result == null)
                SendNotFoundMessage();

            return result;
        }

        public async Task RemoveAsync(Guid id)
        {
            var offiveInventory = await _context.OfficeEquipmentInventories.FirstOrDefaultAsync(x => x.Id == id);

            if (offiveInventory == null)
                SendNotFoundMessage();

            _context.Remove(offiveInventory);

            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(OfficeEquipmentInventory item)
        {
            var equipmentInventory = await _context.OfficeEquipmentInventories.FirstOrDefaultAsync(x => x.Id  == item.Id);

            if (equipmentInventory == null)
                SendNotFoundMessage();

            _context.OfficeEquipmentInventories.Update(item);

            var result = await _context.SaveChangesAsync() > 0;


            return result;
        }

        private void SendNotFoundMessage()
        {
            throw new ArgumentException("NotFound");
        }
    }
}
