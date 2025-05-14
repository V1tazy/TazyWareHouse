using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Application.DTOs.UserDTOs
{
    public class AuthReponse
    {
        public Guid Id { get; set; }

        public required string Email { get; set; }

        public string? FirtsName { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }
        public string Role { get; set; } = "user";

        public required string Token { get; set; }
    }
}
