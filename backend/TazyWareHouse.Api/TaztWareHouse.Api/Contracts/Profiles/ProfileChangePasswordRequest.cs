namespace TazyWareHouse.Api.Contracts.Profiles
{
    public record class ProfileChangePasswordRequest
    {
        public required string Email { get; set; }

        public required string CurrentPassword { get; set; }

        public required string NewPassword { get; set; }
    }
}
