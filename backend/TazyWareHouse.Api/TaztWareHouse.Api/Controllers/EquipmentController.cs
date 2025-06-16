using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TazyWareHouse.Application.Interfaces;

namespace TazyWareHouse.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService _equipmentService;

        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }
    }
}
