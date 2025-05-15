using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Core.Entityes.Base
{

    public abstract class EntityBase: IEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
