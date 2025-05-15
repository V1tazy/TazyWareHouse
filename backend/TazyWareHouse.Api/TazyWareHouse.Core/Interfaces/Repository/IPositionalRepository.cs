using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces.Base;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IPositionalRepository : IRepository<Position>
    {
        public Task<IEnumerable<Position>> GetAllAsync();
    }
}
