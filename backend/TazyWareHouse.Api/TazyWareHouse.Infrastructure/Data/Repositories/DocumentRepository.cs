using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Core.Entityes.Documents;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Infrastructure.Data.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly AppDbContext _context;

        public DocumentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Document>> GetDocumentsAsync(string? searchTerm, string? typeFilter, string? statusFilter, string? tags, int page, int pageSize)
        {
            var query = _context.Documents
                .Include(d => d.DocumentType)
                .Include(d => d.Responsible)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(d =>
                    d.Name.Contains(searchTerm) ||
                    d.Description.Contains(searchTerm) ||
                    d.Responsible.FullName.Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(typeFilter) && typeFilter != "Все")
            {
                query = query.Where(d => d.DocumentType.Name == typeFilter);
            }

            if (!string.IsNullOrEmpty(statusFilter) && statusFilter != "Все")
            {
                query = query.Where(d => d.Status == statusFilter);
            }

            if (!string.IsNullOrEmpty(tags))
            {
                query = query.Where(d => d.Tags.Contains(tags));
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Document> GetDocumentByIdAsync(Guid id)
        {
            return await _context.Documents
                .Include(d => d.DocumentType)
                .Include(d => d.Responsible)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<Document> AddDocumentAsync(Document document)
        {
            await _context.Documents.AddAsync(document);
            await _context.SaveChangesAsync();
            return document;
        }

        public async Task<bool> UpdateDocumentAsync(Document document)
        {
            _context.Documents.Update(document);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteDocumentAsync(Guid id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null) return false;

            _context.Documents.Remove(document);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<DocumentType>> GetAllDocumentTypesAsync()
        {
            return await _context.DocumentTypes.AsNoTracking().ToListAsync();
        }
    }
}