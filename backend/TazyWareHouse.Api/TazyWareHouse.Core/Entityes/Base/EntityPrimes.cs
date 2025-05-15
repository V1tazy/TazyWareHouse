using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Entityes.Base
{
    public abstract class EntityPrimes: EntityBase
    {
        public string Title { get; set; }
        public string Location { get; set; }
        public string Addres { get; set; }

        public string Status { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public Guid ResponsibleId { get; set; }

        public User Responsible { get; set; }
    }
}
