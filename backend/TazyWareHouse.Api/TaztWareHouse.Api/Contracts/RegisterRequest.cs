namespace TazyWareHouse.Api.Contracts
{
    public record class RegisterRequest
    {
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
