using TazyWareHouse.Core.Entityes.Offices;

namespace TazyWareHouse.Application.Interfaces
{
    public interface IOfficeService
    {
        Task<IEnumerable<Office>> GetAllAsync();
        Task<Office> GetByIdAsync(Guid id);
        Task<Office> AddAsync(Office office);
        Task<bool> UpdateAsync(Office office);
        Task RemoveAsync(Guid id);
    }
}