using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Entityes.DashBoard
{
    public class DashboardTask: EntityBase
    {
        public string Title { get; set; }

        public string Priority { get; set; }

        public User CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime DueData { get; set; }
    }
}
