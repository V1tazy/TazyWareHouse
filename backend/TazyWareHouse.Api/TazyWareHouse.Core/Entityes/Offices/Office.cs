using System;
using System.Collections.Generic;
using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Equipments;

namespace TazyWareHouse.Core.Entityes.Offices
{
    public class Office : EntityBase
    {
        public string Title { get; set; }
        public string Location { get; set; }
        public string Responsible { get; set; }
        public string Status { get; set; }

        // Навигационное свойство для оборудования
        public ICollection<Equipment> Equipments { get; set; } = new List<Equipment>();
    }
}
