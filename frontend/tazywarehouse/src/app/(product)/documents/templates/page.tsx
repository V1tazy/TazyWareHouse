// /pages/documents/templates.tsx
"use client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { useDocument } from "@/hooks/useDocument";

const templateColumns = [
  { key: "name", header: "Название" },
  { key: "type", header: "Тип" },
  {
    key: "actions",
    header: "Действия",
    render: (_, row) => (
      <div className="flex gap-2">
        <Link href={`/documents/templates/${row.id}/edit`} className="text-blue-500 hover:text-blue-600">
          Редактировать
        </Link>
        <button className="text-red-500 hover:text-red-600">Удалить</button>
      </div>
    ),
  },
];

export default function TemplatesPage() {
  const { templates } = useDocument();

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Шаблоны документов</h1>
          <Link
            href="/documents/templates/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Создать шаблон
          </Link>
        </div>
      </header>

      <Table
        title="Список шаблонов"
        data={templates}
        columns={templateColumns}
        emptyMessage="Шаблоны не найдены."
      />
    </div>
  );
}