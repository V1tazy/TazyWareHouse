using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Models;
using TazyWareHouse.Core.Stores;

namespace TazyWareHouse.Persistance
{
    internal class UserRepository : IUsersStores
    {
        public Task Add(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
