using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Products;

namespace TazyWareHouse.Core.Entityes.Equipments
{
    public class Equipment: EntityNamed
    {
        public Category Category { get; set; }

        public string Model { get; set; }

        public string SerialNumber { get; set; }

        public DateTime Warranty { get; set; }

        public string Status { get; set; }
    }
}