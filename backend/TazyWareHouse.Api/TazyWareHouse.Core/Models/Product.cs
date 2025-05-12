using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Core.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public string WareHouse {  get; set; }

        public string Status { get; set; }

        public string FilePath { get; set; }


    }
}
