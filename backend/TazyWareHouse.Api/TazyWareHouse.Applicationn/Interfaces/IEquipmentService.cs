using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Equipments;

namespace TazyWareHouse.Application.Interfaces
{
    public interface IEquipmentService
    {
        Task<IEnumerable<Equipment>> GetEquipmentsAsync(string? searchTerm, string? typeFilter, string? statusFilter, int page, int pageSize);
        Task<Equipment> GetEquipmentByIdAsync(Guid id);
        Task<Equipment> CreateEquipmentAsync(Equipment equipment);
        Task<bool> UpdateEquipmentAsync(Equipment equipment);
        Task<bool> DeleteEquipmentAsync(Guid id);
    }
}
