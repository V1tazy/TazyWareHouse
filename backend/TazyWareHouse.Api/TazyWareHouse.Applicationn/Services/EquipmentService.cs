using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Core.Entityes.Equipments;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Application.Services
{
    public class EquipmentService : IEquipmentService
    {
        private readonly IEquimentRepository _equipmentRepository;
        private readonly IOfficeRepository _officeRepository;

        public EquipmentService(IEquimentRepository equipmentRepository, IOfficeRepository officeRepository)
        {
            _equipmentRepository = equipmentRepository;
            _officeRepository = officeRepository;
        }
        public async Task<Equipment> CreateEquipmentAsync(Equipment equipment, Guid officeId)
        {
            var office = await _officeRepository.GetByIdAsync(officeId);

            if(office is null)
            {
                throw new ArgumentException("Office not found", nameof(officeId));
            }


            return await _equipmentRepository.AddAsync(equipment);
        }

        public Task<bool> DeleteEquipmentAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Equipment> GetEquipmentByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Equipment>> GetEquipmentsAsync(string? searchTerm, string? typeFilter, string? statusFilter, int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateEquipmentAsync(Equipment equipment)
        {
            throw new NotImplementedException();
        }
    }
}
