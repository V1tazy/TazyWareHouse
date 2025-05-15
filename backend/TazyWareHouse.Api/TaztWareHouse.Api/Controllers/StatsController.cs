using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        [HttpGet("warehouses")]
        public IActionResult GetWarehouses()
        {
            // Пример моковых данных, аналогичных фронтенду
            var data = new
            {
                total = new
                {
                    name = "Общая статистика",
                    totalItems = 5242,
                    turnoverRate = 15.4,
                    categories = new[]
                    {
                            new { name = "Офисная техника", value = 35 },
                            new { name = "Комплектующие", value = 25 },
                            new { name = "Мебель", value = 20 },
                            new { name = "Хозтовары", value = 15 },
                            new { name = "Прочее", value = 5 }
                        },
                    monthlyData = new[]
                    {
                            new { month = "Янв", received = 320, shipped = 295 },
                            new { month = "Фев", received = 350, shipped = 320 },
                            new { month = "Мар", received = 480, shipped = 450 },
                            new { month = "Апр", received = 290, shipped = 310 },
                            new { month = "Май", received = 360, shipped = 340 },
                            new { month = "Июн", received = 340, shipped = 330 }
                        },
                    equipmentStatus = new[]
                    {
                            new { type = "Рабочие", count = 542 },
                            new { type = "На ремонте", count = 18 },
                            new { type = "Списано", count = 15 }
                        }
                },
                warehouses = new[]
                {
                        new
                        {
                            id = 1,
                            name = "Основной склад",
                            totalItems = 1242,
                            turnoverRate = 12.4,
                            categories = new[]
                            {
                                new { name = "Офисная техника", value = 35 },
                                new { name = "Комплектующие", value = 25 },
                                new { name = "Мебель", value = 20 },
                                new { name = "Хозтовары", value = 15 },
                                new { name = "Прочее", value = 5 }
                            },
                            monthlyData = new[]
                            {
                                new { month = "Янв", received = 120, shipped = 95 },
                                new { month = "Фев", received = 150, shipped = 120 },
                                new { month = "Мар", received = 180, shipped = 150 },
                                new { month = "Апр", received = 90, shipped = 110 },
                                new { month = "Май", received = 160, shipped = 140 },
                                new { month = "Июн", received = 140, shipped = 130 }
                            },
                            equipmentStatus = new[]
                            {
                                new { type = "Рабочие", count = 142 },
                                new { type = "На ремонте", count = 8 },
                                new { type = "Списано", count = 5 }
                            }
                        },
                        new
                        {
                            id = 2,
                            name = "Запасной склад",
                            totalItems = 2000,
                            turnoverRate = 18.2,
                            categories = new[]
                            {
                                new { name = "Офисная техника", value = 25 },
                                new { name = "Комплектующие", value = 35 },
                                new { name = "Мебель", value = 15 },
                                new { name = "Хозтовары", value = 20 },
                                new { name = "Прочее", value = 5 }
                            },
                            monthlyData = new[]
                            {
                                new { month = "Янв", received = 100, shipped = 100 },
                                new { month = "Фев", received = 100, shipped = 100 },
                                new { month = "Мар", received = 200, shipped = 200 },
                                new { month = "Апр", received = 100, shipped = 100 },
                                new { month = "Май", received = 100, shipped = 100 },
                                new { month = "Июн", received = 100, shipped = 100 }
                            },
                            equipmentStatus = new[]
                            {
                                new { type = "Рабочие", count = 200 },
                                new { type = "На ремонте", count = 5 },
                                new { type = "Списано", count = 5 }
                            }
                        },
                        new
                        {
                            id = 3,
                            name = "Склад №3",
                            totalItems = 2000,
                            turnoverRate = 15.5,
                            categories = new[]
                            {
                                new { name = "Офисная техника", value = 20 },
                                new { name = "Комплектующие", value = 30 },
                                new { name = "Мебель", value = 25 },
                                new { name = "Хозтовары", value = 20 },
                                new { name = "Прочее", value = 5 }
                            },
                            monthlyData = new[]
                            {
                                new { month = "Янв", received = 100, shipped = 100 },
                                new { month = "Фев", received = 100, shipped = 100 },
                                new { month = "Мар", received = 100, shipped = 100 },
                                new { month = "Апр", received = 100, shipped = 100 },
                                new { month = "Май", received = 100, shipped = 100 },
                                new { month = "Июн", received = 100, shipped = 100 }
                            },
                            equipmentStatus = new[]
                            {
                                new { type = "Рабочие", count = 200 },
                                new { type = "На ремонте", count = 5 },
                                new { type = "Списано", count = 5 }
                            }
                        }
                    }
            };

            return Ok(data);
        }
    }
}
