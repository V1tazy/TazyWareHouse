"use client";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeftIcon, PencilIcon, TrashIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useFiltering } from "@/hooks/useFiltering";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tazywarehouse_offices";
const EQUIPMENT_KEY = "tazywarehouse_equipment";

// Получить офис из localStorage по id
function getOfficeById(id: string | number) {
  const offices = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return offices.find((o: any) => String(o.id) === String(id)) || null;
}

// Получить оборудование, закреплённое за офисом
function getEquipmentByOffice(officeName: string) {
  const equipment = JSON.parse(localStorage.getItem(EQUIPMENT_KEY) || "[]");
  return equipment.filter((e: any) => e.office === officeName);
}

// Мок-данные истории перемещений (можно заменить на localStorage)
const mockTransfers = [
  { id: 1, equipment: "Ноутбук Dell XPS 15", from: "Склад", to: "Головной офис", date: "2023-02-10", responsible: "Сергей Иванов" },
  { id: 2, equipment: "Монитор LG 27UL850", from: "Филиал СПб", to: "Головной офис", date: "2023-03-15", responsible: "Анна Соколова" },
];

export default function OfficeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const officeIdRaw = params.id;
  const officeId = Array.isArray(officeIdRaw) ? officeIdRaw[0] : officeIdRaw;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState<any[]>([]);

  useEffect(() => {
    if (!officeId) return;
    const office = getOfficeById(officeId);
    setData(office);
    setLoading(false);

    if (office) {
      setEquipment(getEquipmentByOffice(office.name));
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

  const handleEdit = () => {
    router.push(`/office/${officeId}/edit`);
  };

  const handleDelete = () => {
    // Удаление офиса из localStorage
    const offices = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = offices.filter((o: any) => String(o.id) !== String(officeId));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    router.push("/office");
  };

  if (loading) return <div>Загрузка...</div>;
  if (!data) return <div>Данные не найдены</div>;

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/office")}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                data.status === "Активен" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {data.status}
              </span>
              <p className="mt-1 text-sm text-gray-500">ID: {data.id}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md"
                title="Редактировать"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md"
                title="Удалить"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
                title="Печать"
              >
                <PrinterIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Местоположение</h3>
              <p className="mt-1 text-sm text-gray-900">{data.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Адрес</h3>
              <p className="mt-1 text-sm text-gray-900">{data.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ответственный</h3>
              <p className="mt-1 text-sm text-gray-900">{data.responsible}</p>
            </div>
            {/* Можно добавить телефон/email, если они есть в данных */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Статистика</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Количество оборудования</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{equipment.length}</p>
            </div>
            {/* Можно добавить распределение по типам, если нужно */}
          </div>
        </div>
      </div>

      </div>
  );
}