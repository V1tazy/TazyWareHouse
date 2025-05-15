using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.SupportInfrastructure.Services
{
    public class PasswordHasher : IPasswordHasher
    {
        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

        public bool VerifyPassword(string hash, string password) => BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
