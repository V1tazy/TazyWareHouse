using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.DashBoard;
using TazyWareHouse.Core.Interfaces.Base;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IDashboardActivityRepository: IRepository<DashboardActivities>
    {
        Task<IEnumerable<DashboardActivities>> GetAllActivitiesByUserEmailAsync(string email);
    }
}
