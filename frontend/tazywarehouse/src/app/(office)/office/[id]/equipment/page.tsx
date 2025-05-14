"use client";
import { useRouter, useParams } from "next/navigation";
import { PlusIcon, ArrowLeftIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { Pagination } from "@/components/Pagination/Pagination";
import { useFiltering } from "@/hooks/useFiltering";
import { EquipmentTableConfig } from "@/config/TableConfig/EquipmentTableConfig";

const mockEquipment = [
  { id: 1, type: "Ноутбук", model: "Dell XPS 15", serial: "DXPS152023001", status: "В использовании", user: "Иван Петров", warranty: "2025-01-15", location: "Головной офис" },
  { id: 2, type: "Монитор", model: "LG 27UL850", serial: "LG27850023", status: "В использовании", user: "Анна Соколова", warranty: "2024-11-20", location: "Головной офис" },
  { id: 3, type: "Принтер", model: "HP LaserJet Pro", serial: "HPLJP2023003", status: "На складе", user: "", warranty: "2025-03-10", location: "Склад" },
  { id: 4, type: "Стул", model: "ErgoChair Pro", serial: "ECP2023001", status: "В использовании", user: "Дмитрий Иванов", warranty: "2026-05-15", location: "Головной офис" },
  { id: 5, type: "Стол", model: "StandDesk 150", serial: "STD15020232", status: "В использовании", user: "Елена Смирнова", warranty: "2024-12-31", location: "Головной офис" },
];

export default function OfficeEquipmentPage() {
  const router = useRouter();
  const params = useParams();
  const officeId = params.id;

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    paginatedData: paginatedEquipment,
    totalPages,
    handlePageChange,
  } = useFiltering({
    data: mockEquipment.filter(eq => eq.location === "Головной офис"),
    searchFields: ["type", "model", "serial", "user"],
    initialStatusFilter: "Все",
    itemsPerPage: 5,
  });

  const statusOptions = [
    { value: "Все", label: "Все статусы" },
    { value: "В использовании", label: "В использовании" },
    { value: "На складе", label: "На складе" },
    { value: "В ремонте", label: "В ремонте" },
    { value: "Списано", label: "Списано" },
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push(`/office/${officeId}`)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Оборудование офиса</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск по типу, модели, серийному номеру..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => router.push(`/offices/${officeId}/equipment/new`)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Добавить оборудование
            </button>
          </div>
        </div>

        <Table
          title="Список оборудования"
          data={paginatedEquipment}
          columns={EquipmentTableConfig}
          emptyMessage="Оборудование не найдено"
          onRowClick={(id) => router.push(`/office/${officeId}/equipment/${id}`)}
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