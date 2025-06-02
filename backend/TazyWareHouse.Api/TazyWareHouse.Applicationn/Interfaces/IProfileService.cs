using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.DashBoard;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Application.Interfaces
{
    public interface IProfileService
    {
        Task<User> GetProfileData(string email);
        Task<User> UpdateProfileData(User user);
        Task<bool> ChangeProfilePassword(string email, string currentPassword, string newPassword);
        Task<IEnumerable<DashboardActivities>> GetDashboardActivitiesByCurrentUser(string email);
    }
}
