"use client";
import { useRouter } from "next/navigation";
import { PlusIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { Pagination } from "@/components/Pagination/Pagination";
import { useFiltering } from "@/hooks/useFiltering";
import { Badge } from "@/components/Badge/Component";

const mockRequests = [
  { id: 1, equipment: "Ноутбук Dell XPS 15", user: "Иван Петров", office: "Головной офис", date: "2023-05-10", status: "Одобрено", type: "Выдача" },
  { id: 2, equipment: "Монитор LG 27UL850", user: "Анна Соколова", office: "Филиал СПб", date: "2023-05-12", status: "В обработке", type: "Выдача" },
  { id: 3, equipment: "Принтер HP LaserJet", user: "Дмитрий Иванов", office: "Региональный офис", date: "2023-05-15", status: "Отклонено", type: "Возврат" },
  { id: 4, equipment: "Стул ErgoChair Pro", user: "Елена Смирнова", office: "Офис продаж", date: "2023-05-18", status: "Завершено", type: "Выдача" },
];

const requestColumns = [
  { key: "id", header: "ID", width: "10%" },
  { key: "equipment", header: "Оборудование", width: "25%" },
  { key: "user", header: "Сотрудник", width: "15%" },
  { key: "office", header: "Офис", width: "15%" },
  { key: "date", header: "Дата", width: "10%" },
  { 
    key: "status", 
    header: "Статус", 
    width: "15%",
    render: (value: string) => (
      <Badge 
        variant={
          value === "Одобрено" ? "success" :
          value === "Отклонено" ? "danger" :
          value === "Завершено" ? "primary" : "warning"
        }
      >
        {value}
      </Badge>
    )
  },
  { 
    key: "actions", 
    header: "", 
    width: "10%",
    render: (_: any, row: any) => (
      <div className="flex space-x-2">
        {row.status === "В обработке" && (
          <>
            <button className="text-green-500 hover:text-green-700">
              <CheckIcon className="h-5 w-5" />
            </button>
            <button className="text-red-500 hover:text-red-700">
                X
            </button>
          </>
        )}
        <button className="text-blue-500 hover:text-blue-700">
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    )
  },
];

export default function RequestsPage() {
  const router = useRouter();
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    paginatedData: paginatedRequests,
    totalPages,
    handlePageChange,
  } = useFiltering({
    data: mockRequests,
    searchFields: ["equipment", "user", "office"],
    initialStatusFilter: "Все",
    itemsPerPage: 5,
  });

  const statusOptions = [
    { value: "Все", label: "Все статусы" },
    { value: "В обработке", label: "В обработке" },
    { value: "Одобрено", label: "Одобрено" },
    { value: "Отклонено", label: "Отклонено" },
    { value: "Завершено", label: "Завершено" },
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Заявки на оборудование</h1>
          <button
            onClick={() => router.push("/requests/new")}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Новая заявка
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Поиск по оборудованию, сотруднику или офису..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
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
        </div>

        <Table
          title="Список заявок"
          data={paginatedRequests}
          columns={requestColumns}
          emptyMessage="Заявки не найдены"
          onRowClick={(id) => router.push(`/requests/${id}`)}
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