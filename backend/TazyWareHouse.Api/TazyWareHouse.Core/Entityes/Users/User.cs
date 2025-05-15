using TazyWareHouse.Core.Entityes.Base;

namespace TazyWareHouse.Core.Entityes.Users
{
    public class User: EntityBase
    {
        public required string Email { get; set; }
        public required string HashedPassword { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public Position Position { get; set; }
    }
}