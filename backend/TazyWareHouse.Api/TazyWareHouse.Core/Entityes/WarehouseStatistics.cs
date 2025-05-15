namespace TazyWareHouse.Core.Entityes
{
    public class WarehouseStatistics
    {
        public string Name { get; set; }
        public int TotalItems { get; set; }
        public double TurnoverRate { get; set; }
        public List<CategoryStat> Categories { get; set; }
        public List<MonthlyData> MonthlyData { get; set; }
        public List<EquipmentStatus> EquipmentStatuses { get; set; }
    }
}
