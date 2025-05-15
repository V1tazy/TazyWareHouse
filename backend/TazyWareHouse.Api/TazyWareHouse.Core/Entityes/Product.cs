using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Core.Entityes
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; } // title -> Name
        public string ImagePath { get; set; } // image -> ImagePath
        public string Category { get; set; } // details[0].value -> Category
        public string Meansure { get; set; } // details[1].value -> Meansure
        public string WareHouse { get; set; } // details[2].value -> WareHouse
        public string Supplier { get; set; } // details[3].value -> Supplier
    }
}
