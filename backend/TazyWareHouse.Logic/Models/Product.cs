using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Logic.Models
{
    public class Product
    {
        public Product(Guid id, string name, decimal price, string desciption)
        {
            Id = id;
            Name = name;
            Price = price;
            Description = desciption;
        }


        public Guid Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}
