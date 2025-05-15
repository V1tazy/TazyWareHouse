using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly AppDbContext _context;


        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<bool> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
