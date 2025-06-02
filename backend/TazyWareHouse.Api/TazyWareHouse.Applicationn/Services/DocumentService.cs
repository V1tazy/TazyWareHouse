using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Core.Entityes.Documents;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Application.Services
{
    public class DocumentService: IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;

        public DocumentService(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public async Task<IEnumerable<Document>> GetDocumentsAsync(string? searchTerm, string? typeFilter, string? statusFilter, string? tags, int page, int pageSize)
        {
            return await _documentRepository.GetDocumentsAsync(searchTerm, typeFilter, statusFilter, tags, page, pageSize);
        }

        public async Task<Document> GetDocumentByIdAsync(Guid id)
        {
            return await _documentRepository.GetDocumentByIdAsync(id);
        }

        public async Task<Document> CreateDocumentAsync(Document document)
        {
            return await _documentRepository.AddDocumentAsync(document);
        }

        public async Task<bool> UpdateDocumentAsync(Document document)
        {
            return await _documentRepository.UpdateDocumentAsync(document);
        }

        public async Task<bool> DeleteDocumentAsync(Guid id)
        {
            return await _documentRepository.DeleteDocumentAsync(id);
        }

        public async Task<IEnumerable<DocumentType>> GetDocumentTemplatesAsync()
        {
            return await _documentRepository.GetAllDocumentTypesAsync();
        }
    }
}