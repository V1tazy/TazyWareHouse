using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Interfaces
{
    public interface IAuthService
    {
        Task<User> LoginAsync (string email, string password);
        Task<User> RegisterAsync(string email, string password, string? firstName, string? lastName, string? phoneNumber);
    }
}
