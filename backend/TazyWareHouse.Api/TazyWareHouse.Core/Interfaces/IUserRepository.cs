using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User> CreateAsync(User user);
        Task<bool> UpdateAsync(User user);

    }
}
