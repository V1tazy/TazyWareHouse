using TazyWareHouse.Core.Models;

namespace TazyWareHouse.Core.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
