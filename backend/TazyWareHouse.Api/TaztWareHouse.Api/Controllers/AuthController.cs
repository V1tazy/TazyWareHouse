using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // Моковые данные пользователя (в реальном приложении замените на базу данных)
        private readonly User _mockUser = new User
        {
            Id = "1",
            Email = "vitazyq@gmail.com",
            Password = "12345", // В реальном приложении используйте хеширование!
            Name = "vitazy",
            Role = "admin"
        };

        // POST: api/Auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            if (request.Email == _mockUser.Email && request.Password == _mockUser.Password)
            {
                var response = new
                {
                    _mockUser.Id,
                    _mockUser.Email,
                    _mockUser.Name,
                    _mockUser.Role,
                    Token = "mock-jwt-token" // В реальном приложении генерируйте JWT
                };

                return Ok(response);
            }

            return Unauthorized(new { message = "Invalid email or password" });
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            if (request.Email == _mockUser.Email)
            {
                return Conflict(new { message = "User already exists" });
            }

            // В реальном приложении здесь была бы логика создания пользователя
            var response = new
            {
                Id = "2",
                request.Email,
                Name = request.Email.Split('@')[0],
                Role = "user",
                Token = "mock-jwt-token"
            };

            return Ok(response);
        }

        public class User
        {
            public string Id { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Name { get; set; }
            public string Role { get; set; }
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class RegisterRequest : LoginRequest
        {
            // Можно добавить дополнительные поля для регистрации
        }
    }
}