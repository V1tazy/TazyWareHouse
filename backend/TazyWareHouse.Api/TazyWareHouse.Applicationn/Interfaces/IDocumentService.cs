using TazyWareHouse.Core.Entityes.Documents;

namespace TazyWareHouse.Application.Interfaces
{
    public interface IDocumentService
    {
        Task<IEnumerable<Document>> GetDocumentsAsync(string? searchTerm, string? typeFilter, string? statusFilter, string? tags, int page, int pageSize);
        Task<Document> GetDocumentByIdAsync(Guid id);
        Task<Document> CreateDocumentAsync(Document document);
        Task<bool> UpdateDocumentAsync(Document document);
        Task<bool> DeleteDocumentAsync(Guid id);

        public Task<IEnumerable<DocumentType>> GetDocumentTemplatesAsync();
    }
}