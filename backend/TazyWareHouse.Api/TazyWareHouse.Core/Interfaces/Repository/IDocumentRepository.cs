using TazyWareHouse.Core.Entityes.Documents;

namespace TazyWareHouse.Core.Interfaces.Repository
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetDocumentsAsync(string? searchTerm, string? typeFilter, string? statusFilter, string? tags, int page, int pageSize);
        Task<Document> GetDocumentByIdAsync(Guid id);
        Task<Document> AddDocumentAsync(Document document);
        Task<bool> UpdateDocumentAsync(Document document);
        Task<bool> DeleteDocumentAsync(Guid id);

        public Task<IEnumerable<DocumentType>> GetAllDocumentTypesAsync();
    }
}