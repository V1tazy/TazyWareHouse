using TazyWareHouse.Core.Entityes.Base;

namespace TazyWareHouse.Core.Entityes.Users
{
    public class Position: EntityNamed
    {

        public IEnumerable<Role> roles { get; set; }
    }
}
