using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Core.Models
{
    internal class User
    {
        public int Id { get; set; }

        public string Login { get; set; }

        public string HashPassword { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Pathronyc {  get; set; }

    }
}
