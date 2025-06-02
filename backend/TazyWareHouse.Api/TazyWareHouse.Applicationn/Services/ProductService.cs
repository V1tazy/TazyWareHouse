using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Application.Services
{

    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<Product> GetByIdAsync(Guid id) => await _repo.GetAsync(id);
        public async Task<IEnumerable<Product>> GetAllAsync() => await _repo.GetAllAsync();
        public async Task<Product> AddAsync(Product product) => await _repo.AddAsync(product);
        public async Task<bool> UpdateAsync(Product product) => await _repo.UpdateAsync(product);
        public async Task RemoveAsync(Guid id) => await _repo.RemoveAsync(id);
    }
}
