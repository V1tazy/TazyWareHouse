using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPositionalRepository _positionalRepository;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(
            IUserRepository userRepository,
            IPositionalRepository positionalRepository,
            IPasswordHasher passwordService)
        {
            _userRepository = userRepository;
            _positionalRepository = positionalRepository;
            _passwordHasher = passwordService;
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email)
                ?? throw new UnauthorizedAccessException("User not found");

            if (!_passwordHasher.VerifyPassword(user.HashedPassword, password))
                throw new UnauthorizedAccessException("Invalid password");

            return user;
        }

        public async Task<User> RegisterAsync(string email, string password, string? firstName, string? lastName, string? phoneNumber)
        {
            if (await _userRepository.GetUserByEmailAsync(email) != null)
                throw new InvalidOperationException("User already exists");

            var positions = await _positionalRepository.GetAllAsync();
            var defaultPosition = positions.FirstOrDefault();

            if (defaultPosition == null)
            {

                throw new InvalidOperationException("No positions available in the system");
            }

            var user = new User
            {
                Email = email,
                HashedPassword = _passwordHasher.HashPassword(password),
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                Position = defaultPosition
            };

            return await _userRepository.AddAsync(user);
        }
    }
}