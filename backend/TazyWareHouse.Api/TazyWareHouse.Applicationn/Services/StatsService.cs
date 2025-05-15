using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Application.Services
{
    public class StatsService : IStatsService
    {
        private readonly IWarehouseRepository _warehouseRepository;

        public StatsService(IWarehouseRepository warehouseRepository)
        {
            _warehouseRepository = warehouseRepository;
        }

        public async Task<IEnumerable<Warehouse>> GetAllWarehousesAsync()
        {
            return await _warehouseRepository.GetAllAsync();
        }

        public async Task<Warehouse?> GetWarehouseByIdAsync(int warehouseId)
        {
            return await _warehouseRepository.GetByIdAsync(warehouseId);
        }

        public async Task<List<CategoryStat>> GetCategoryStatsAsync(int warehouseId)
        {
            var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new KeyNotFoundException("Склад не найден");

            return warehouse.Categories ?? new List<CategoryStat>();
        }

        public async Task<List<MonthlyData>> GetMonthlyDataAsync(int warehouseId)
        {
            var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new KeyNotFoundException("Склад не найден");

            return warehouse.MonthlyData ?? new List<MonthlyData>();
        }

        public async Task<List<EquipmentStatus>> GetEquipmentStatusesAsync(int warehouseId)
        {
            var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new KeyNotFoundException("Склад не найден");

            return warehouse.EquipmentStatuses ?? new List<EquipmentStatus>();
        }

        public async Task<int> GetOccupancyAsync(int warehouseId)
        {
            var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new KeyNotFoundException("Склад не найден");

            return warehouse.Occupancy;
        }

        public async Task<int> GetTotalItemsAsync(int warehouseId)
        {
            var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new KeyNotFoundException("Склад не найден");

            return warehouse.TotalItems;
        }

        public async Task<double> GetTurnoverRateAsync(int warehouseId)
        {
            var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new KeyNotFoundException("Склад не найден");

            return warehouse.TurnoverRate;
        }
        public async Task AddWarehouseAsync(Warehouse warehouse)
        {
            if (warehouse == null)
                throw new ArgumentNullException(nameof(warehouse), "Склад не может быть null");

            // Простейшая валидация, можно расширить по необходимости
            if (string.IsNullOrWhiteSpace(warehouse.Name))
                throw new ArgumentException("Имя склада не может быть пустым", nameof(warehouse.Name));

            await _warehouseRepository.AddAsync(warehouse);
        }
    }
}
