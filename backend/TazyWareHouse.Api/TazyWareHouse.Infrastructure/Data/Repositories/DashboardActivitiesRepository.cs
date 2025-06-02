using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.DashBoard;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class DashboardActivitiesRepository : IDashboardActivityRepository
    {
        private readonly AppDbContext _context;

        public DashboardActivitiesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardActivities> AddAsync(DashboardActivities item)
        {
            _context.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<IEnumerable<DashboardActivities>> GetAllActivitiesByUserEmailAsync(string email)
        {
            var activities = await _context.DashboardActivities
                .Where(activity => activity.User.Email == email)
                .ToListAsync();

            // Стандартная проверка на пустую коллекцию
            if (activities == null || !activities.Any())
                return Enumerable.Empty<DashboardActivities>();

            return activities;
        }
        public async Task<DashboardActivities> GetAsync(Guid id)
        {
            return await _context.DashboardActivities.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task RemoveAsync(Guid id)
        {
            var activies = await _context.DashboardActivities.FindAsync(id);

            if(activies != null)
            {
                _context.DashboardActivities.Remove(activies);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> UpdateAsync(DashboardActivities item)
        {
            _context.DashboardActivities.Update(item);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
