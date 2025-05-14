using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Stores;

namespace TazyWareHouse.Application
{
    public class UserService
    {
        private readonly IUsersStores _usersStores;

        public UserService(IUsersStores usersStores)
        {
            _usersStores = usersStores;
        }

        public async Task Get()
        {
            return;
        }

        public async Task Update()
        {

        }

        public async Task AuthUser()
        {

        }
    }
}
