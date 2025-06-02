using Microsoft.AspNetCore.Mvc;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Api.Contracts;
using TazyWareHouse.Core.Entityes.Offices;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfficeController : ControllerBase
    {
        private readonly IOfficeService _service;
        public OfficeController(IOfficeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var offices = await _service.GetAllAsync();
            var dtos = offices.Select(o => new OfficeDto
            {
                Id = o.Id,
                Name = o.Title,
                Location = o.Location,
                Responsible = o.Responsible,
                Status = o.Status,
                EquipmentCount = o.Equipments?.Count ?? 0
            });
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var office = await _service.GetByIdAsync(id);
            if (office == null) return NotFound();
            var dto = new OfficeDto
            {
                Id = office.Id,
                Name = office.Title,
                Location = office.Location,
                Responsible = office.Responsible,
                Status = office.Status,
                EquipmentCount = office.Equipments?.Count ?? 0
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OfficeDto dto)
        {
            var office = new Office
            {
                Title = dto.Name,
                Location = dto.Location,
                Responsible = dto.Responsible,
                Status = dto.Status
            };
            var created = await _service.AddAsync(office);
            dto.Id = created.Id;
            dto.EquipmentCount = 0;
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] OfficeDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var office = new Office
            {
                Id = dto.Id,
                Title = dto.Name,
                Location = dto.Location,
                Responsible = dto.Responsible,
                Status = dto.Status
            };
            var updated = await _service.UpdateAsync(office);
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
}
