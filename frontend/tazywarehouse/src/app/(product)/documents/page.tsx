"use client";
import { useState } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { documentColumns } from "@/config/TableConfig/DocumentConfig";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filters } from "@/components/Filters/Filters";

const mockDocuments = [
  { id: 1, name: "Счет №001", type: "Счет", status: "Черновик", createdAt: "2025-05-01", responsible: "Иван Петров" },
  { id: 2, name: "Акт №023", type: "Акт", status: "Утвержден", createdAt: "2025-04-28", responsible: "Анна Соколова" },
  { id: 3, name: "Инвентаризация №005", type: "Инвентаризация", status: "Ожидает", createdAt: "2025-05-10", responsible: "Дмитрий Иванов" },
  { id: 4, name: "Гарантия №017", type: "Гарантия", status: "Подписан", createdAt: "2025-05-03", responsible: "Елена Смирнова" },
];

export default function DocumentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredDocuments = mockDocuments.filter((document) => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "Все" || document.type === typeFilter;
    const matchesStatus = statusFilter === "Все" || document.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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