using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Models;

namespace TazyWareHouse.Core.Stores
{
    public interface IUsersStores
    {
        Task<User> GetUserByEmail(string email);

        Task Add(User user);

    }
}
