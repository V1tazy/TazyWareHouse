﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TazyWareHouse.Application.DTOs.UserDTOs
{
    public class RegisterRequest
    {
        public required string Email { get; set; }
        
        public string Password { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }

    }
}
