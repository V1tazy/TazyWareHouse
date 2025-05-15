using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Api.Contracts
{
    public record class AuthResponse
    {
        public required string Email { get; set; }
        public required Position Position { get; set; }
        public required string Token { get; set; }
    }
}
