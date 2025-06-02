using Microsoft.AspNetCore.Mvc;
using TazyWareHouse.Api.Contracts;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Core.Entityes.Products;
using TazyWareHouse.Core.Interfaces;
using TazyWareHouse.Core.Interfaces.Repository;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;
    private readonly ICategoryRepository _categoryRepo;
    private readonly ISupplierRepository _supplierRepo;
    private readonly IMeansureRepository _meansureRepo;

    public ProductController(
        IProductService service,
        ICategoryRepository categoryRepo,
        ISupplierRepository supplierRepo,
        IMeansureRepository meansureRepo)
    {
        _service = service;
        _categoryRepo = categoryRepo;
        _supplierRepo = supplierRepo;
        _meansureRepo = meansureRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _service.GetAllAsync();
        var dtos = products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            CategoryName = p.Category?.Name,
            CategoryId = p.Category?.Id,
            SupplierName = p.Supplier?.Name,
            SupplierId = p.Supplier?.Id,
            MeansureName = p.Meansure?.Name,
            MeansureId = p.Meansure?.Id
        });
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var p = await _service.GetByIdAsync(id);
        if (p == null) return NotFound();
        var dto = new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            CategoryName = p.Category?.Name,
            CategoryId = p.Category?.Id,
            SupplierName = p.Supplier?.Name,
            SupplierId = p.Supplier?.Id,
            MeansureName = p.Meansure?.Name,
            MeansureId = p.Meansure?.Id
        };
        return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductDto dto)
    {
        var category = dto.CategoryId.HasValue ? await _categoryRepo.GetAsync(dto.CategoryId.Value) : null;
        var supplier = dto.SupplierId.HasValue ? await _supplierRepo.GetAsync(dto.SupplierId.Value) : null;
        var meansure = dto.MeansureId.HasValue ? await _meansureRepo.GetAsync(dto.MeansureId.Value) : null;

        var product = new Product
        {
            Name = dto.Name,
            Category = category,
            Supplier = supplier,
            Meansure = meansure
        };
        var created = await _service.AddAsync(product);
        dto.Id = created.Id;
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ProductDto dto)
    {
        if (id != dto.Id) return BadRequest();

        var category = dto.CategoryId.HasValue ? await _categoryRepo.GetAsync(dto.CategoryId.Value) : null;
        var supplier = dto.SupplierId.HasValue ? await _supplierRepo.GetAsync(dto.SupplierId.Value) : null;
        var meansure = dto.MeansureId.HasValue ? await _meansureRepo.GetAsync(dto.MeansureId.Value) : null;

        var product = new Product
        {
            Id = dto.Id,
            Name = dto.Name,
            Category = category,
            Supplier = supplier,
            Meansure = meansure
        };
        var updated = await _service.UpdateAsync(product);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.RemoveAsync(id);
        return NoContent();
    }
}