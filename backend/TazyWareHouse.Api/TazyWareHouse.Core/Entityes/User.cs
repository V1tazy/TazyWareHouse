namespace TazyWareHouse.Core.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Email { get; set; }
        public required string HashedPassword { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Role { get; set; } = "user";
        public string? PhoneNumber { get; set; }
    }
}