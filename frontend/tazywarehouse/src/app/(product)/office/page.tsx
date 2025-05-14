"use client"; // Client component for interactivity

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

// Mock office data (replace with API call later)
const mockOffices = [
  { id: 1, name: "Головной офис", location: "Москва", responsible: "Иван Петров", status: "Активен", equipmentCount: 25 },
  { id: 2, name: "Филиал", location: "Санкт-Петербург", responsible: "Анна Соколова", status: "Активен", equipmentCount: 15 },
  { id: 3, name: "Региональный офис", location: "Казань", responsible: "Дмитрий Иванов", status: "Неактивен", equipmentCount: 5 },
  { id: 4, name: "Офис продаж", location: "Ростов", responsible: "Елена Смирнова", status: "Активен", equipmentCount: 10 },
];

// Types for office data
interface Office {
  id: number;
  name: string;
  location: string;
  responsible: string;
  status: string;
  equipmentCount: number;
}

export default function OfficePage() {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter offices based on search and status
  const filteredOffices = mockOffices.filter((office) => {
    const matchesSearch = office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         office.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         office.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Все" || office.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOffices.length / itemsPerPage);
  const paginatedOffices = filteredOffices.slice(
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
      {/* Заголовок */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Офисы</h1>
          <Link
            href="/offices/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Добавить офис
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
                placeholder="Поиск по названию, местоположению или ответственному..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Фильтр по статусу */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Все">Все статусы</option>
              <option value="Активен">Активен</option>
              <option value="Неактивен">Неактивен</option>
            </select>
          </div>
        </section>

        {/* Таблица офисов */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
            Список офисов
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Местоположение</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ответственный</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество оборудования</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOffices.length > 0 ? (
                  paginatedOffices.map((office) => (
                    <tr key={office.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{office.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{office.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{office.responsible}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            office.status === "Активен" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {office.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{office.equipmentCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                        <Link
                          href={`/offices/${office.id}`}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Просмотр
                        </Link>
                        <Link
                          href={`/offices/${office.id}/equipment`}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Управление оборудованием
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      Офисы не найдены.
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