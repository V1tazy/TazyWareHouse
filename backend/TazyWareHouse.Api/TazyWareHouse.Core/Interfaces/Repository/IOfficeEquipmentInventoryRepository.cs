using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Offices;
using TazyWareHouse.Core.Interfaces.Base;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IOfficeEquipmentInventoryRepository: IRepository<OfficeEquipmentInventory>
    {
        Task<IEnumerable<OfficeEquipmentInventory>> GetByOfficeIdAsync(Guid officeId);
        Task<OfficeEquipmentInventory> GetByOfficeAndEquipmentIdAsync(Guid officeId, Guid equipmentId);
    }
}
