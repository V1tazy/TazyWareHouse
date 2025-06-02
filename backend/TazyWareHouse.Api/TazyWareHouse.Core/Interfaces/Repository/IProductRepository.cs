using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces.Base;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetAllAsync();
    }
}
