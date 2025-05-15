using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes;

namespace TazyWareHouse.Core.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();

        Task<IEnumerable<Product>> GetAllByWareHouseAsync(Warehouse warehouse);
        Task<Product> GetByIdAsync(Guid id);
        Task<Product> CreateAsync(Product product);
        Task<Product> UpdateAsync(Product product);
        Task DeleteAsync(Guid id);
    }
}
