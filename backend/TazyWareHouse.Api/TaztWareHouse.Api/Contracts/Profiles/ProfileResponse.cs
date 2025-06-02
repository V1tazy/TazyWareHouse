namespace TazyWareHouse.Api.Contracts.Profiles
{
    public record class ProfileResponse
    {
        public required string Email { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string PhoneNumber { get; set; }
    }
}
