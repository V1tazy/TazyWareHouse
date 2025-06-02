import Link from "next/link";
import { ColumnConfig } from "./BaseTableConfig";




const documentColumns: ColumnConfig[] = [
  { key: "name", header: "Название" },
  { key: "documentTypeName", header: "Тип документа" }, // Используем `documentTypeId` напрямую
  { 
    key: "status", 
    header: "Статус",
    render: (value) => (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        value === "Утвержден" || value === "Подписан" 
          ? "bg-green-100 text-green-800" 
          : value === "Ожидает" 
            ? "bg-yellow-100 text-yellow-800" 
            : "bg-gray-100 text-gray-800"
      }`}>
        {value}
      </span>
    )
  },
  { key: "userEmail", header: "Ответственный" }, // Используем `userEmail` напрямую
  { 
    key: "actions", 
    header: "Действия",
    render: (_, row) => (
      <div className="flex gap-2">
        <Link href={`/documents/${row.id}`} className="text-blue-500 hover:text-blue-600">
          Просмотр
        </Link>
        {row.status === "Черновик" && (
          <Link href={`/documents/${row.id}/edit`} className="text-blue-500 hover:text-blue-600">
            Редактировать
          </Link>
        )}
        <button
          onClick={() => alert(`Экспорт ${row.name}...`)}
          className="text-blue-500 hover:text-blue-600"
        >
          Экспортировать
        </button>
      </div>
    )
  }
];

export { documentColumns };