namespace TazyWareHouse.Core.Entityes
{
    public class EquipmentStatus
    {
        public string Id { get; set; }
        public string Type { get; set; } // "Рабочие", "На ремонте", "Списано"
        public int Count { get; set; }
    }
}
