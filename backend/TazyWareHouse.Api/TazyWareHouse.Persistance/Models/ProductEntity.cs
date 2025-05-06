using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Persistance.Models
{
    public class ProductEntity
    {

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; } = 0;

        public int Quantity { get; set; } = 0;

        public CategoryEntity? Category { get; set; }
    }
}
