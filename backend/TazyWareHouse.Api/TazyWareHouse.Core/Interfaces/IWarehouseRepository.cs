using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes;

namespace TazyWareHouse.Core.Interfaces
{
    public interface IWarehouseRepository
    {
        Task<Warehouse?> GetByIdAsync(int id);
        Task<IEnumerable<Warehouse>> GetAllAsync();
        Task AddAsync(Warehouse warehouse);
        Task UpdateAsync(Warehouse warehouse);
        Task DeleteAsync(int id);
        Task<IEnumerable<Warehouse>> GetByStatusAsync(string status);
        Task<IEnumerable<Warehouse>> GetByLocationAsync(string location);
        Task<IEnumerable<Warehouse>> GetByOccupancyRangeAsync(int minOccupancy, int maxOccupancy);
        Task<IEnumerable<Warehouse>> GetByTurnoverRateAsync(double minRate, double maxRate);
    }
}
