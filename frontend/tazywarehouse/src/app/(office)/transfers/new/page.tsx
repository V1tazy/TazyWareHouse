"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function NewTransferPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "передача",
    fromLocation: "",
    toLocation: "",
    equipment: [],
    responsible: "",
    transferDate: new Date().toISOString().split('T')[0],
    notes: "",
  });

  const mockEquipment = [
    { id: 1, name: "Ноутбук Dell XPS 15", serial: "DXPS152023001" },
    { id: 2, name: "Монитор LG 27UL850", serial: "LG27850023" },
    { id: 3, name: "Принтер HP LaserJet Pro", serial: "HPLJP2023003" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Логика сохранения акта
    console.log("Создан акт приема-передачи:", formData);
    router.push("/transfers");
  };

  const handleEquipmentSelect = (id: number) => {
    setFormData(prev => {
      const equipment = [...prev.equipment];
      const index = equipment.indexOf(id);
      if (index > -1) {
        equipment.splice(index, 1);
      } else {
        equipment.push(id);
      }
      return { ...prev, equipment };
    });
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Создать акт приема-передачи</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Тип акта*
              </label>
              <select
                id="type"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="передача">Передача оборудования</option>
                <option value="прием">Прием оборудования</option>
                <option value="возврат">Возврат оборудования</option>
              </select>
            </div>

            <div>
              <label htmlFor="transferDate" className="block text-sm font-medium text-gray-700">
                Дата акта*
              </label>
              <input
                type="date"
                id="transferDate"
                required
                value={formData.transferDate}
                onChange={(e) => setFormData({ ...formData, transferDate: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700">
                Откуда*
              </label>
              <select
                id="fromLocation"
                required
                value={formData.fromLocation}
                onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Выберите локацию</option>
                <option value="Головной офис">Головной офис</option>
                <option value="Филиал СПб">Филиал СПб</option>
                <option value="Склад">Склад</option>
              </select>
            </div>

            <div>
              <label htmlFor="toLocation" className="block text-sm font-medium text-gray-700">
                Куда*
              </label>
              <select
                id="toLocation"
                required
                value={formData.toLocation}
                onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Выберите локацию</option>
                <option value="Головной офис">Головной офис</option>
                <option value="Филиал СПб">Филиал СПб</option>
                <option value="Склад">Склад</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="responsible" className="block text-sm font-medium text-gray-700">
              Ответственный*
            </label>
            <input
              type="text"
              id="responsible"
              required
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Оборудование*
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
              {mockEquipment.map((item) => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`equipment-${item.id}`}
                    checked={formData.equipment.includes(item.id)}
                    onChange={() => handleEquipmentSelect(item.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`equipment-${item.id}`} className="ml-2 block text-sm text-gray-900">
                    {item.name} (SN: {item.serial})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Примечания
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/transfers")}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Создать акт
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}