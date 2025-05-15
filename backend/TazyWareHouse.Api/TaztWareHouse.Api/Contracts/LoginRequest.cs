namespace TazyWareHouse.Api.Contracts
{
    public record class LoginRequest
    {
        public required string Email { get; set; }
        public string Password { get; set; } 
    }
}
