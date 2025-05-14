"use client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { documentColumns } from "@/config/TableConfig/DocumentConfig";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filters } from "@/components/Filters/Filters";
import { useFiltering } from "@/hooks/useFiltering";

const mockDocuments = [
  { id: 1, name: "Счет №001", type: "Счет", status: "Черновик", createdAt: "2025-05-01", responsible: "Иван Петров" },
  { id: 2, name: "Акт №023", type: "Акт", status: "Утвержден", createdAt: "2025-04-28", responsible: "Анна Соколова" },
  { id: 3, name: "Инвентаризация №005", type: "Инвентаризация", status: "Ожидает", createdAt: "2025-05-10", responsible: "Дмитрий Иванов" },
  { id: 4, name: "Гарантия №017", type: "Гарантия", status: "Подписан", createdAt: "2025-05-03", responsible: "Елена Смирнова" },
];

export default function DocumentPage() {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    paginatedData: paginatedDocuments,
    totalPages,
    handlePageChange,
  } = useFiltering({
    data: mockDocuments,
    searchFields: ["name", "responsible"],
    initialStatusFilter: "Все",
    initialTypeFilter: "Все",
    itemsPerPage: 5,
  });

  const typeOptions = [
    { value: "Все", label: "Все типы" },
    { value: "Счет", label: "Счет" },
    { value: "Акт", label: "Акт" },
    { value: "Инвентаризация", label: "Инвентаризация" },
    { value: "Гарантия", label: "Гарантия" },
  ];

  const statusOptions = [
    { value: "Все", label: "Все статусы" },
    { value: "Черновик", label: "Черновик" },
    { value: "Ожидает", label: "Ожидает" },
    { value: "Утвержден", label: "Утвержден" },
    { value: "Подписан", label: "Подписан" },
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Документы</h1>
          <Link
            href="/documents/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Создать документ
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          searchPlaceholder="Поиск по названию или ответственному..."
          showTypeFilter={true}
          statusOptions={statusOptions}
          typeOptions={typeOptions}
        />

        <Table
          title="Список документов"
          data={paginatedDocuments}
          columns={documentColumns}
          emptyMessage="Документы не найдены."
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-4"
          showFirstLast
          maxVisiblePages={5}
        />
      </div>
    </div>
  );
}