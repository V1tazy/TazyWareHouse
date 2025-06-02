namespace TazyWareHouse.Api.Contracts
{
    public class OfficeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Responsible { get; set; }
        public string Status { get; set; }
        public int EquipmentCount { get; set; }
    }
}