using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Equipments;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Offices;

namespace TazyWareHouse.Core.Entityes.Base
{
    public class EntityInventory: EntityBase
    {
        public Equipment Equipment { get; set; }
        public User User { get; set; }
        public DateTime assignedDate { get; set; }
    }
}
