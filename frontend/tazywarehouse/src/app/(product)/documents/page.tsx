"use client"; // Client component for interactivity

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

// Mock document data (replace with API call later)
const mockDocuments = [
  { id: 1, name: "Счет №001", type: "Счет", status: "Черновик", createdAt: "2025-05-01", responsible: "Иван Петров" },
  { id: 2, name: "Акт №023", type: "Акт", status: "Утвержден", createdAt: "2025-04-28", responsible: "Анна Соколова" },
  { id: 3, name: "Инвентаризация №005", type: "Инвентаризация", status: "Ожидает", createdAt: "2025-05-10", responsible: "Дмитрий Иванов" },
  { id: 4, name: "Гарантия №017", type: "Гарантия", status: "Подписан", createdAt: "2025-05-03", responsible: "Елена Смирнова" },
];

// Types for document data
interface Document {
  id: number;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  responsible: string;
}

export default function DocumentPage() {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter documents based on search, type, and status
  const filteredDocuments = mockDocuments.filter((document) => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "Все" || document.type === typeFilter;
    const matchesStatus = statusFilter === "Все" || document.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      {/* Заголовок с приветствием */}
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

      {/* Основной контент */}
      <div className="grid grid-cols-1 gap-6">
        {/* Фильтры */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-blue-500 mr-2 rounded-full"></span>
            Фильтры
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Поле поиска */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию или ответственному..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Фильтр по типу */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Все">Все типы</option>
              <option value="Счет">Счет</option>
              <option value="Акт">Акт</option>
              <option value="Инвентаризация">Инвентаризация</option>
              <option value="Гарантия">Гарантия</option>
            </select>
            {/* Фильтр по статусу */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Все">Все статусы</option>
              <option value="Черновик">Черновик</option>
              <option value="Ожидает">Ожидает</option>
              <option value="Утвержден">Утвержден</option>
              <option value="Подписан">Подписан</option>
            </select>
          </div>
        </section>

        {/* Таблица документов */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
            Список документов
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ответственный</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDocuments.length > 0 ? (
                  paginatedDocuments.map((document) => (
                    <tr key={document.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{document.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            document.status === "Утвержден" || document.status === "Подписан"
                              ? "bg-green-100 text-green-800"
                              : document.status === "Ожидает"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.responsible}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                        <Link
                          href={`/documents/${document.id}`}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Просмотр
                        </Link>
                        {document.status === "Черновик" && (
                          <Link
                            href={`/documents/${document.id}/edit`}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            Редактировать
                          </Link>
                        )}
                        {document.status === "Ожидает" && (
                          <Link
                            href={`/documents/${document.id}/sign`}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            Подписать
                          </Link>
                        )}
                        <button
                          onClick={() => alert(`Экспорт ${document.name}...`)} // Replace with actual export logic
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Экспортировать
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      Документы не найдены.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Пагинация */}
        {totalPages > 1 && (
          <section className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300"
            >
              Предыдущая
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300"
            >
              Следующая
            </button>
          </section>
        )}
      </div>
    </div>
  );
}