using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Core.Entityes.Offices;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Application.Services
{
    public class OfficeService : IOfficeService
    {
        private readonly IOfficeRepository _repo;
        public OfficeService(IOfficeRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Office>> GetAllAsync() => await _repo.GetAllAsync();
        public async Task<Office> GetByIdAsync(Guid id) => await _repo.GetByIdAsync(id);
        public async Task<Office> AddAsync(Office office) => await _repo.AddAsync(office);
        public async Task<bool> UpdateAsync(Office office) => await _repo.UpdateAsync(office);
        public async Task RemoveAsync(Guid id) => await _repo.RemoveAsync(id);
    }
}
