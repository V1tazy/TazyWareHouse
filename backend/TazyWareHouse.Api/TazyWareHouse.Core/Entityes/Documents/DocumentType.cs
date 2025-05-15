using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TazyWareHouse.Core.Entityes.Base;

namespace TazyWareHouse.Core.Entityes.Documents
{
    public class DocumentType: EntityNamed
    {
        public string TemplateURL { get; set; }
    }
}
