"use client";
import { useRouter, useParams } from "next/navigation";
import { PlusIcon, ArrowLeftIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/Table/Table";
import { Pagination } from "@/components/Pagination/Pagination";
import { useFiltering } from "@/hooks/useFiltering";
import { EquipmentTableConfig } from "@/config/TableConfig/EquipmentTableConfig";
import { useEffect, useState } from "react";

const OFFICE_KEY = "tazywarehouse_offices";
const EQUIPMENT_KEY = "tazywarehouse_equipment";

// Получить офис по id
function getOfficeById(id: string | number) {
  const offices = JSON.parse(localStorage.getItem(OFFICE_KEY) || "[]");
  return offices.find((o: any) => String(o.id) === String(id)) || null;
}

// Получить оборудование по имени офиса
function getEquipmentByOffice(officeName: string) {
  const equipment = JSON.parse(localStorage.getItem(EQUIPMENT_KEY) || "[]");
  return equipment.filter((e: any) => e.office === officeName);
}

export default function OfficeEquipmentPage() {
  const router = useRouter();
  const params = useParams();
  const officeIdRaw = params.id;
  const officeId = Array.isArray(officeIdRaw) ? officeIdRaw[0] : officeIdRaw;

  const [office, setOffice] = useState<any>(null);
  const [equipment, setEquipment] = useState<any[]>([]);

  useEffect(() => {
    if (!officeId) return;
    const officeObj = getOfficeById(officeId);
    setOffice(officeObj);
    if (officeObj) {
      setEquipment(getEquipmentByOffice(officeObj.name));
    }
  }, [officeId]);

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
    data: equipment,
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

  if (!office) return <div className="p-4">Офис не найден</div>;

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
          <h1 className="text-2xl font-bold text-gray-900">Оборудование офиса: {office.name}</h1>
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
              onClick={() => router.push(`/office/${officeId}/equipment/new`)}
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
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-4"
        />
      </div>
    </div>
  );
}