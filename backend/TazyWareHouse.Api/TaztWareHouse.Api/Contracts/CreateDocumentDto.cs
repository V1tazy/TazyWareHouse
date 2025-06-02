namespace TazyWareHouse.Api.Contracts
{
    public record CreateDocumentDto(string DocumentType, string DocumentURL, string Status, string ResponsibleEmail);
}
