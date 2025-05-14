import Link from "next/link";
import { ColumnConfig } from "./BaseTableConfig";



export const warehouseColumns: ColumnConfig[] = [
  { key: "name", header: "Название" },
  { key: "location", header: "Местоположение" },
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
  { key: "occupancy", header: "Заполненность", render: (value) => `${value}%` },
  { key: "turnoverRate", header: "Коэффициент оборачиваемости", render: (value) => value.toFixed(2) },
  { 
    key: "actions", 
    header: "Действия",
    render: (_, row) => (
      <div className="flex gap-2">
        <Link href={`/warehouses/${row.id}`} className="text-blue-500 hover:text-blue-600">
          Просмотр
        </Link>
        <Link href={`/warehouses/${row.id}/manage`} className="text-blue-500 hover:text-blue-600">
          Управление запасами
        </Link>
      </div>
    )
  }
];