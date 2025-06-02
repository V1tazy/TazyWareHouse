using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Offices;
using TazyWareHouse.Core.Interfaces.Base;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IOfficeRepository: IRepository<Office>
    {
        Task<Office> GetByIdAsync(Guid id);
        Task<IEnumerable<Office>> GetAllAsync();
        Task<bool> ExistsAsync(Guid id);
    }
}
