namespace TazyWareHouse.Api.Contracts.Profiles
{
    public record class ProfileLoadDataRequest
    {
        public required string Email { get; set; }
    }
}
