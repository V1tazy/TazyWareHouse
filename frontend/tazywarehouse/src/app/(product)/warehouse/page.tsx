"use client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { warehouseColumns } from "@/config/TableConfig/WarehouseConfig";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filters } from "@/components/Filters/Filters";
import { useFiltering } from "@/hooks/useFiltering";

const mockWarehouses = [
  { id: 1, name: "Главный склад", location: "Москва", status: "Активен", occupancy: 75, turnoverRate: 0.85 },
  { id: 2, name: "Северный склад", location: "Санкт-Петербург", status: "Активен", occupancy: 60, turnoverRate: 0.72 },
  { id: 3, name: "Южный склад", location: "Ростов", status: "Неактивен", occupancy: 20, turnoverRate: 0.45 },
  { id: 4, name: "Восточный хаб", location: "Казань", status: "Активен", occupancy: 90, turnoverRate: 0.95 },
];

export default function WarehousePage() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    paginatedData: paginatedWarehouses,
    totalPages,
    handlePageChange,
  } = useFiltering({
    data: mockWarehouses,
    searchFields: ["name", "location"],
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
          <h1 className="text-2xl font-bold text-gray-900">Склады</h1>
          <Link
            href="/warehouses/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Добавить склад
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchPlaceholder="Поиск по названию или местоположению..."
          statusOptions={statusOptions}
        />

        <Table
          title="Список складов"
          data={paginatedWarehouses}
          columns={warehouseColumns}
          emptyMessage="Склады не найдены"
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