using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Entityes.Documents
{
    public class Document : EntityBase
    {
        public string Name { get; set; }
        public string DocumentURL { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastModifiedAt { get; set; } = DateTime.UtcNow;
        public string Description { get; set; }
        public string Tags { get; set; }

        public Guid DocumentTypeId { get; set; }
        public DocumentType DocumentType { get; set; }

        public Guid ResponsibleId { get; set; }
        public User Responsible { get; set; }
    }
}