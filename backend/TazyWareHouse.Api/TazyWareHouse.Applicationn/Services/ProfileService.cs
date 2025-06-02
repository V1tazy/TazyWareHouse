
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Core.Entityes.DashBoard;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Application.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDashboardActivityRepository _boardActivityRepository;
        private readonly IPasswordHasher _passwordHasher;

        public ProfileService(IUserRepository userRepository, IDashboardActivityRepository boardActivityRepository, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _boardActivityRepository = boardActivityRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<bool> ChangeProfilePassword(string email ,string currentPassword, string newPassword)
        {
            if (string.IsNullOrEmpty(currentPassword) || string.IsNullOrEmpty(newPassword))
                throw new InvalidOperationException("Password is empty");

            var user = await _userRepository.GetUserByEmailAsync(email) 
                ?? throw new UnauthorizedAccessException("User not found");

            if (!_passwordHasher.VerifyPassword(user.HashedPassword, currentPassword))
                throw new UnauthorizedAccessException("Invalid password");

            user = new User
            {
                Id = user.Id,
                Email = email,
                HashedPassword = _passwordHasher.HashPassword(currentPassword),
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Position = user.Position,
            };

            return await _userRepository.UpdateAsync(user);
        }

        public async Task<IEnumerable<DashboardActivities>> GetDashboardActivitiesByCurrentUser(string email)
        {
            return await _boardActivityRepository.GetAllActivitiesByUserEmailAsync(email);
        }

        public async Task<User> GetProfileData(string email)
        {
            return await _userRepository.GetUserByEmailAsync(email) ??
                throw new UnauthorizedAccessException("User not found");
        }

        public async Task<User> UpdateProfileData(User user)
        {
            await _userRepository.UpdateAsync(user);

            return user;
        }
    }
}
