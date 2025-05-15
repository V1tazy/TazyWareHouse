using TazyWareHouse.Core.Entityes.Base;

namespace TazyWareHouse.Core.Entityes.Products
{
    public class Product: EntityBase
    {
        public string Name { get; set; }

        public Category Category { get; set; }

        public Supplier Supplier { get; set; }

        public Meansure Meansure { get; set; }

    }
}
