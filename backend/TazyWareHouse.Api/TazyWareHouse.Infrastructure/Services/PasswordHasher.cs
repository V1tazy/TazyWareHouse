using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Infrastructure.Services
{
    public class PasswordHasher: IPasswordHasher
    {
        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

        public bool VerifyPassword(string hash, string password) => BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
