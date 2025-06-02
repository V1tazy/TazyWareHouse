namespace TazyWareHouse.Api.Contracts
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public Guid? CategoryId { get; set; }
        public string SupplierName { get; set; }
        public Guid? SupplierId { get; set; }
        public string MeansureName { get; set; }
        public Guid? MeansureId { get; set; }
    }
}