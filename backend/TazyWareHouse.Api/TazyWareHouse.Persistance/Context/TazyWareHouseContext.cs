using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TazyWareHouse.Persistance
{
    public class TazyWareHouseContext: DbContext
    {
        public TazyWareHouseContext(DbContextOptions<TazyWareHouseContext> options): base(options) { }
    }
}
