using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Models;

namespace TazyWareHouse.Infrastructure
{
    public class ProductRepository
    {
        public List<Product> ListProduct = new List<Product>()
        {
            new Product{Id=1, Description = "dasda", WareHouse = "saddsa", Status = "asdasda",  FilePath= "plug", Price=100, Title= "asdad"}
        };
    }
}
