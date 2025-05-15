using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Core.Entityes
{
    public class Warehouse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Status { get; set; } // "Активен" или "Неактивен"
        public int Occupancy { get; set; } // Заполненность в процентах
        public double TurnoverRate { get; set; } // Коэффициент оборачиваемости

        public int TotalItems { get; set; }
        public List<CategoryStat> Categories { get; set; }
        public List<MonthlyData> MonthlyData { get; set; }
        public List<EquipmentStatus> EquipmentStatuses { get; set; }
    }
}
