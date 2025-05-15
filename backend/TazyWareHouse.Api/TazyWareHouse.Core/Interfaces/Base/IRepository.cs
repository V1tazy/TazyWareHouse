using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Core.Interfaces.Base
{
    public interface IRepository<T> where T : class, IEntity, new()
    {
        Task<T> GetAsync(Guid id);

        Task<T> AddAsync(T item);

        Task<bool> UpdateAsync(T item);
        Task RemoveAsync(Guid id);

    }
}
