using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Entityes.DashBoard
{
    public class DashboardActivities: EntityBase
    {
        public string Title { get; set; }

        public string Type { get; set; }

        public DateTime TimeStamp { get; set; }

        public User User { get; set; }
    }
}
