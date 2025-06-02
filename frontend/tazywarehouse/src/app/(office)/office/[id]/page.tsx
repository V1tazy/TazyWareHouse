"use client";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeftIcon, PencilIcon, TrashIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import { TransferHistory } from "@/components/TranferHistory/Component";
import { Table } from "@/components/Table/Table";
import { EquipmentTableConfig } from "@/config/TableConfig/EquipmentTableConfig";
import { useFiltering } from "@/hooks/useFiltering";
import { useEffect, useState } from "react";



const mockEquipment = [
  { id: 1, type: "Ноутбук", model: "Dell XPS 15", serial: "DXPS152023001", status: "В использовании", user: "Иван Петров", warranty: "2025-01-15" },
  { id: 2, type: "Монитор", model: "LG 27UL850", serial: "LG27850023", status: "В использовании", user: "Анна Соколова", warranty: "2024-11-20" },
  { id: 3, type: "Принтер", model: "HP LaserJet Pro", serial: "HPLJP2023003", status: "На складе", user: "", warranty: "2025-03-10" },
];

const mockTransfers = [
  { id: 1, equipment: "Ноутбук Dell XPS 15", from: "Склад", to: "Головной офис", date: "2023-02-10", responsible: "Сергей Иванов" },
  { id: 2, equipment: "Монитор LG 27UL850", from: "Филиал СПб", to: "Головной офис", date: "2023-03-15", responsible: "Анна Соколова" },
];

export default function OfficeDetailsPage() {

  const router = useRouter();
  const params = useParams();
  const officeId = params.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5149/api/office/${officeId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
      data: mockEquipment,
      searchFields: ["type", "model", "serial", "user"],
      initialStatusFilter: "Все",
      itemsPerPage: 5,
    });

  const handleEdit = () => {
    router.push(`/office/${officeId}/edit`);
  };

  const handleDelete = () => {
    // Логика удаления офиса
    console.log("Удаление офиса:", officeId);
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
            <div>
              <h3 className="text-sm font-medium text-gray-500">Телефон</h3>
              <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-sm text-gray-900">{data.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Дата создания</h3>
              <p className="mt-1 text-sm text-gray-900">{data.createdAt}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Статистика</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Количество оборудования</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{data.equipmentCount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Распределение по типам</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Ноутбуки</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Мониторы</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Принтеры</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Мебель</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b border-gray-200">
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium ${selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`
              }
            >
              Оборудование ({mockEquipment.length})
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium ${selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`
              }
            >
              История перемещений ({mockTransfers.length})
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
                    <Table
                        title="Список оборудования"
                        data={paginatedEquipment}
                        columns={EquipmentTableConfig}
                        emptyMessage="Оборудование не найдено"
                        onRowClick={(id) => router.push(`/office/${officeId}/equipment/${id}`)}
                    />
            </Tab.Panel>
            <Tab.Panel>
              <TransferHistory data={mockTransfers} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}