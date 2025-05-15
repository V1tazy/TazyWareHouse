using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Base;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Core.Entityes.Documents
{
    public class Document: EntityBase
    {
        public DocumentType DocumentType { get; set; }
        
        public string DocumentURL { get; set; }

        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public User Responsible { get; set; }
    }
}
