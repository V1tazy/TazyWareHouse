namespace TazyWareHouse.Api.DTOs
{
    public class DocumentDto
    {
        public Guid? Id { get; set; } // Для создания можно не передавать
        public string Name { get; set; }
        public string DocumentURL { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public Guid DocumentTypeId { get; set; }
        public string UserEmail { get; set; } // Email текущего пользователя
    }
}