"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { officeColumns } from "@/config/TableConfig/OfficeConfig";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filters } from "@/components/Filters/Filters";
import { useFiltering } from "@/hooks/useFiltering";

const STORAGE_KEY = "tazywarehouse_offices";
const DEFAULT_OFFICES = [
  {
    id: 1,
    name: "Офис Москва",
    location: "Москва",
    responsible: "Иван Иванов",
    status: "Активен",
  },
  {
    id: 2,
    name: "Офис СПб",
    location: "Санкт-Петербург",
    responsible: "Мария Петрова",
    status: "Активен",
  },
  {
    id: 3,
    name: "Офис Казань",
    location: "Казань",
    responsible: "Алексей Смирнов",
    status: "Неактивен",
  },
];

function getOfficesFromStorage() {
  if (typeof window === "undefined") return DEFAULT_OFFICES;
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_OFFICES;
    }
  }
  return DEFAULT_OFFICES;
}

function saveOfficesToStorage(offices: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offices));
  }
}

export default function OfficePage() {
  const [offices, setOffices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем офисы из localStorage
  useEffect(() => {
    function syncOffices() {
      setOffices(getOfficesFromStorage());
      setLoading(false);
    }
    syncOffices();
    window.addEventListener("focus", syncOffices);
    window.addEventListener("storage", syncOffices);
    return () => {
      window.removeEventListener("focus", syncOffices);
      window.removeEventListener("storage", syncOffices);
    };
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    paginatedData: paginatedOffices,
    totalPages,
    handlePageChange,
  } = useFiltering({
    data: offices,
    searchFields: ["name", "location", "responsible"],
    initialStatusFilter: "Все",
    itemsPerPage: 5,
  });

  const statusOptions = [
    { value: "Все", label: "Все статусы" },
    { value: "Активен", label: "Активен" },
    { value: "Неактивен", label: "Неактивен" },
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Офисы</h1>
          <Link
            href="/office/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Добавить офис
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchPlaceholder="Поиск по названию, местоположению или ответственному..."
          statusOptions={statusOptions}
        />

        <Table
          title="Список офисов"
          data={paginatedOffices}
          columns={officeColumns}
          emptyMessage={loading ? "Загрузка..." : "Офисы не найдены"}
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