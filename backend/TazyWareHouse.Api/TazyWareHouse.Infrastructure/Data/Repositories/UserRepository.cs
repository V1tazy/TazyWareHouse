using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces.Base;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }


        public async Task<User> AddAsync(User item)
        {
            _context.Users.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<User> GetAsync(Guid id)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task RemoveAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user != null) 
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> UpdateAsync(User item)
        {
            _context.Users.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
