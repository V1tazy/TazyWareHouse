using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes;

namespace TazyWareHouse.Core.Interfaces
{
    public interface IStatsService
    {
        /// <summary>
        /// Получить все склады.
        /// </summary>
        Task<IEnumerable<Warehouse>> GetAllWarehousesAsync();

        /// <summary>
        /// Получить склад по идентификатору.
        /// </summary>
        Task<Warehouse?> GetWarehouseByIdAsync(int warehouseId);

        /// <summary>
        /// Получить статистику по категориям для склада.
        /// </summary>
        Task<List<CategoryStat>> GetCategoryStatsAsync(int warehouseId);

        /// <summary>
        /// Получить месячные данные по складу.
        /// </summary>
        Task<List<MonthlyData>> GetMonthlyDataAsync(int warehouseId);

        /// <summary>
        /// Получить статусы оборудования для склада.
        /// </summary>
        Task<List<EquipmentStatus>> GetEquipmentStatusesAsync(int warehouseId);

        /// <summary>
        /// Получить общую заполненность склада.
        /// </summary>
        Task<int> GetOccupancyAsync(int warehouseId);

        /// <summary>
        /// Получить коэффициент оборачиваемости склада.
        /// </summary>
        Task<double> GetTurnoverRateAsync(int warehouseId);

        /// <summary>
        /// Получить общее количество товаров на складе.
        /// </summary>
        Task<int> GetTotalItemsAsync(int warehouseId);
    }
}
