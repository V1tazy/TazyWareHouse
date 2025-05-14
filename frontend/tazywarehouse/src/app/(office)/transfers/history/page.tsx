

"use client";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { Pagination } from "@/components/Pagination/Pagination";

import { useFiltering } from "@/hooks/useFiltering";
import { Badge } from "@/components/Badge/Component";

const mockTransfers = [
  { id: 1, documentNumber: "TRF-2023-001", type: "Передача", from: "Склад", to: "Головной офис", date: "2023-05-10", equipmentCount: 3, status: "Завершено" },
  { id: 2, documentNumber: "TRF-2023-002", type: "Передача", from: "Головной офис", to: "Филиал СПб", date: "2023-05-12", equipmentCount: 2, status: "Завершено" },
  { id: 3, documentNumber: "TRF-2023-003", type: "Возврат", from: "Филиал СПб", to: "Склад", date: "2023-05-15", equipmentCount: 1, status: "В процессе" },
  { id: 4, documentNumber: "TRF-2023-004", type: "Прием", from: "Поставщик", to: "Склад", date: "2023-05-18", equipmentCount: 5, status: "Завершено" },
];

const transferColumns = [
  { key: "documentNumber", header: "Номер документа", width: "20%" },
  { key: "type", header: "Тип операции", width: "15%" },
  { key: "from", header: "Откуда", width: "15%" },
  { key: "to", header: "Куда", width: "15%" },
  { key: "date", header: "Дата", width: "10%" },
  { key: "equipmentCount", header: "Кол-во", width: "10%" },
  { 
    key: "status", 
    header: "Статус", 
    width: "15%",
    render: (value: string) => (
      <Badge 
        variant={
          value === "Завершено" ? "success" :
          value === "В процессе" ? "warning" : "primary"
        }
      >
        {value}
      </Badge>
    )
  },
];

export default function TransferHistoryPage() {
  const router = useRouter();
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    paginatedData: paginatedTransfers,
    totalPages,
    handlePageChange,
  } = useFiltering({
    data: mockTransfers,
    searchFields: ["documentNumber", "from", "to"],
    initialStatusFilter: "Все",
    itemsPerPage: 5,
  });

  const statusOptions = [
    { value: "Все", label: "Все статусы" },
    { value: "Завершено", label: "Завершено" },
    { value: "В процессе", label: "В процессе" },
  ];

  const typeOptions = [
    { value: "Все", label: "Все типы" },
    { value: "Передача", label: "Передача" },
    { value: "Прием", label: "Прием" },
    { value: "Возврат", label: "Возврат" },
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">История перемещений оборудования</h1>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <input
                type="text"
                placeholder="Поиск по номеру или локациям..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <Table
          title="Акты приема-передачи"
          data={paginatedTransfers}
          columns={transferColumns}
          emptyMessage="Перемещения не найдены"
          onRowClick={(id) => router.push(`/transfers/${id}`)}
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