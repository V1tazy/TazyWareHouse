using Microsoft.AspNetCore.Mvc;
using TazyWareHouse.Api.Contracts;
using TazyWareHouse.Core.Entityes.Users;
using TazyWareHouse.Core.Interfaces;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }


        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _authService.LoginAsync(request.Email, request.Password);
                var token = _tokenService.GenerateToken(user);
                return Ok(ToAuthResponse(user, token));
            }

            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }


        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var user = await _authService.RegisterAsync(request.Email, request.Password, null, null, null);

                var token = _tokenService.GenerateToken(user);

                return CreatedAtAction(nameof(Login), ToAuthResponse(user, token));
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }


        private static AuthResponse ToAuthResponse(User user, string token) => new()
        {
            Email = user.Email,
            Position = user.Position,
            Token = token
        };
    }
}