using TazyWareHouse.Core.Entityes.Base;

namespace TazyWareHouse.Core.Entityes.Users
{
    public class Role: EntityNamed
    {
        public string[] Rules { get; set; }
    }
}
