using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Equipments;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Entityes.Warehouses
{
    public class WarehouseEquipmentInventory: EntityInventory
    {
        public Warehouse Warehouse { get; set; }
    }
}
