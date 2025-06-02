using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Api.DTOs;
using TazyWareHouse.Core.Entityes.Documents;
using TazyWareHouse.Core.Interfaces.Repository;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IUserRepository _userRepository;

        public DocumentController(IDocumentService documentService, IUserRepository userRepository)
        {
            _documentService = documentService;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetDocuments(
            [FromQuery] string? searchTerm,
            [FromQuery] string? typeFilter,
            [FromQuery] string? statusFilter,
            [FromQuery] string? tags,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5)
        {
            var documents = await _documentService.GetDocumentsAsync(searchTerm, typeFilter, statusFilter, tags, page, pageSize);

            // Преобразуем данные в DTO с названием типа документа
            var documentDtos = documents.Select(d => new
            {
                d.Id,
                d.Name,
                d.DocumentURL,
                d.Status,
                d.Description,
                d.Tags,
                d.DocumentTypeId,
                DocumentTypeName = d.DocumentType != null ? d.DocumentType.Name : null
            });

            return Ok(documentDtos);
        }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetDocumentById(Guid id)
            {
                var document = await _documentService.GetDocumentByIdAsync(id);
                if (document == null) return NotFound();

                var documentDto = new
                {
                    document.Id,
                    document.Name,
                    document.DocumentURL,
                    document.Status,
                    document.Description,
                    document.Tags,
                    document.DocumentTypeId,
                    DocumentTypeName = document.DocumentType?.Name
                };

                return Ok(documentDto);
            }


            
        [HttpPost]
        public async Task<IActionResult> CreateDocument([FromBody] DocumentDto documentDto)
        {
            if (documentDto == null || string.IsNullOrEmpty(documentDto.Name) || documentDto.DocumentTypeId == Guid.Empty)
            {
                return BadRequest("Некорректные данные документа.");
            }

            if (string.IsNullOrEmpty(documentDto.UserEmail))
            {
                return BadRequest("Email пользователя не указан.");
            }

            // Ищем пользователя по email
            var user = await _userRepository.GetUserByEmailAsync(documentDto.UserEmail);
            if (user == null)
            {
                return NotFound("Пользователь с указанным email не найден.");
            }

            // Преобразуем DTO в модель
            var document = new Document
            {
                Name = documentDto.Name,
                DocumentURL = documentDto.DocumentURL,
                Status = documentDto.Status,
                Description = documentDto.Description,
                Tags = documentDto.Tags,
                DocumentTypeId = documentDto.DocumentTypeId,
                ResponsibleId = user.Id // Устанавливаем ID найденного пользователя
            };

            var createdDocument = await _documentService.CreateDocumentAsync(document);

            // Возвращаем DTO
            var createdDocumentDto = new DocumentDto
            {
                Id = createdDocument.Id,
                Name = createdDocument.Name,
                DocumentURL = createdDocument.DocumentURL,
                Status = createdDocument.Status,
                Description = createdDocument.Description,
                Tags = createdDocument.Tags,
                DocumentTypeId = createdDocument.DocumentTypeId
            };

            return CreatedAtAction(nameof(GetDocumentById), new { id = createdDocumentDto.Id }, createdDocumentDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDocument(Guid id, [FromBody] DocumentDto documentDto)
        {
            if (id != documentDto.Id) return BadRequest();

            // Преобразуем DTO в модель
            var document = new Document
            {
                Id = documentDto.Id.Value,
                Name = documentDto.Name,
                DocumentURL = documentDto.DocumentURL,
                Status = documentDto.Status,
                Description = documentDto.Description,
                Tags = documentDto.Tags,
                DocumentTypeId = documentDto.DocumentTypeId
            };

            var updated = await _documentService.UpdateDocumentAsync(document);
            if (!updated) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(Guid id)
        {
            var deleted = await _documentService.DeleteDocumentAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpGet("templates")]
        public async Task<IActionResult> GetDocumentTemplates()
        {
            var templates = await _documentService.GetDocumentTemplatesAsync();
            return Ok(templates);
        }
    }
}