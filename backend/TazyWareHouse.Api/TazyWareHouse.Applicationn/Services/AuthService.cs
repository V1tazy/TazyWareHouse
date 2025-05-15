using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Application.Services
{
    public class AuthService: IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(IUserRepository userRepository, IPasswordHasher passwordService)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordService;
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email)
                ?? throw new UnauthorizedAccessException("User not found");


            if (!_passwordHasher.VerifyPassword(user.HashedPassword, password))
                throw new UnauthorizedAccessException("Invalid password");

            return user;
        }

        public async Task<User> RegisterAsync(string email, string password, string? firstName, string? lastName, string? phoneNumber)
        {

            if (await _userRepository.GetByEmailAsync(email) != null)
                throw new InvalidOperationException("User already exists");

            var user = new User
            {
                Email = email,
                HashedPassword = _passwordHasher.HashPassword(password),
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber
            };

            return await _userRepository.CreateAsync(user);
        }
    }
}
