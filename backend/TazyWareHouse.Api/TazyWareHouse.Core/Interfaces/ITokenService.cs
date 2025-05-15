using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
