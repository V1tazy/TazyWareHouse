"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { documentColumns } from "@/config/TableConfig/DocumentConfig";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filters } from "@/components/Filters/Filters";

export default function DocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Функция для загрузки данных с API
const fetchDocuments = async () => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `http://localhost:5149/api/document?searchTerm=${searchTerm}&typeFilter=${typeFilter}&statusFilter=${statusFilter}&page=${currentPage}&pageSize=${itemsPerPage}`
    );

    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных.");
    }

    const data = await response.json();
    console.log("Данные, полученные с API:", data); // Для отладки

    // Устанавливаем данные напрямую
    setDocuments(data); // Если `items` отсутствует, устанавливаем пустой массив
    setTotalPages(data.totalPages || 1); // Если `totalPages` отсутствует, устанавливаем 1
  } catch (err: any) {
    console.error("Ошибка при загрузке документов:", err); // Для отладки
    setError(err.message || "Не удалось загрузить документы.");
  } finally {
    setLoading(false);
  }
};

  // Загрузка данных при изменении фильтров или страницы
  useEffect(() => {
    fetchDocuments();
  }, [searchTerm, typeFilter, statusFilter, currentPage]);

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

        {loading ? (
          <p className="text-center text-gray-500">Загрузка...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Table
            title="Список документов"
            data={documents}
            columns={documentColumns}
            emptyMessage="Документы не найдены."
          />
        )}

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