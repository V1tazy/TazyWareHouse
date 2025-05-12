using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Models;

namespace TazyWareHouse.Application
{
    internal interface IProductService
    {
        public List<Product> GetAllProducts();


    }
}
