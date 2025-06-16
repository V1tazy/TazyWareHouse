using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Equipments;
using TazyWareHouse.Core.Interfaces.Base;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IEquimentRepository: IRepository<Equipment>
    {
        Task<Equipment> GetByIdAsync(Guid id);
        Task<IEnumerable<Equipment>> GetAllAsync();
    }
}
