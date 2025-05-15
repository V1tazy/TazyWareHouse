using Microsoft.AspNetCore.Mvc;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        //private readonly IAuthService _authService;
        //private readonly ITokenService _tokenService;

        //public AuthController(IAuthService authService, ITokenService tokenService)
        //{
        //    _authService = authService;
        //    _tokenService = tokenService;
        //}


        //[HttpPost("login")]
        //public async Task<ActionResult<AuthReponse>> Login([FromBody] LoginRequest request)
        //{
        //    try
        //    {
        //        var user = await _authService.LoginAsync(request.Email, request.Password);
        //        var token = _tokenService.GenerateToken(user);
        //        return Ok(ToAuthResponse(user, token));
        //    }

        //    catch (UnauthorizedAccessException ex)
        //    {
        //        return Unauthorized(new { message = ex.Message });
        //    }
        //}


        //[HttpPost("register")]
        //public async Task<ActionResult<AuthReponse>> Register([FromBody] RegisterRequest request)
        //{
        //    //try
        //    //{
        //    //    var user = await _authService.RegisterAsync(request.Email, request.Password, null, null, null);

        //    //    var token = _tokenService.GenerateToken(user);

        //    //    return CreatedAtAction(nameof(Login), ToAuthResponse(user, token));
        //    //}
        //    //catch (InvalidOperationException ex)
        //    //{
        //    //    return Conflict(new { message = ex.Message });
        //    //}
        //}


        //private static AuthReponse ToAuthResponse(User user, string token) => new()
        //{
        //    Id = user.Id,
        //    Email = user.Email,
        //    FirtsName = user.FirstName,
        //    LastName = user.LastName,
        //    PhoneNumber = user.PhoneNumber,
        //    Role = user.Position,
        //    Token = token
        //};
    }
}