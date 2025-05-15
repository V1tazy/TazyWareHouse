using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Products;

namespace TazyWareHouse.Core.Entityes.Warehouses
{
    public class WarehousesProductInventory: EntityBase
    {

        public Product Product { get; set; }

        public int Quantity { get; set; }

        public Warehouse Warehouse { get; set; }


    }
}
