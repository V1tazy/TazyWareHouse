import Link from "next/link";
import { ColumnConfig } from "./BaseTableConfig";




export const officeColumns: ColumnConfig[] = [
  { key: "name", header: "Название" },
  { key: "location", header: "Местоположение" },
  { key: "responsible", header: "Ответственный" },
  { 
    key: "status", 
    header: "Статус",
    render: (value) => (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        value === "Активен" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        {value}
      </span>
    )
  },
  { key: "equipmentCount", header: "Количество оборудования" },
  { 
    key: "actions", 
    header: "Действия",
    render: (_, row) => (
      <div className="flex gap-2">
        <Link href={`/office/${row.id}`} className="text-blue-500 hover:text-blue-600">
          Просмотр
        </Link>
        <Link href={`/office/${row.id}/equipment`} className="text-blue-500 hover:text-blue-600">
          Управление оборудованием
        </Link>
      </div>
    )
  }
];