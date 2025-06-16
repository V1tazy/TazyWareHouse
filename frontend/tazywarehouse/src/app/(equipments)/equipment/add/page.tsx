"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { mockEquipment } from "@/data/MockData"

const STORAGE_KEY = "tazywarehouse_equipment";

// Простой селект для строковых значений
function StringArraySelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      value={value}
      onChange={e => onChange(e.target.value)}
      required
    >
      <option value="">{placeholder || "Выберите..."}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function getEquipmentFromStorage() {
  if (typeof window === "undefined") return mockEquipment;
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return mockEquipment;
    }
  }
  return mockEquipment;
}

function saveEquipmentToStorage(equipment: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipment));
  }
}

// Значения по умолчанию для параметров (если в моках нет)
const DEFAULT_CATEGORIES = ["Сканеры", "Принтеры", "Мониторы", "Ноутбуки"];
const DEFAULT_SUPPLIERS = ["Поставщик А", "Поставщик Б", "Поставщик В"];
const DEFAULT_MEASURE = ["шт.", "компл."];
const DEFAULT_OFFICES = ["Офис Москва", "Офис СПб", "Офис Казань"];
const DEFAULT_MODELS = ["ScanMaster 2000", "PrintJet X", "UltraView", "NoteBook Pro"];
const DEFAULT_USERS = ["Иван Иванов", "Мария Петрова", "Алексей Смирнов", "Елена Кузнецова"];

export default function EquipmentAddPage() {
  const router = useRouter();

  // Получаем уникальные значения для селектов из mockEquipment + дефолтные
  const allEquipment = typeof window !== "undefined" ? getEquipmentFromStorage() : mockEquipment;
  const typeOptions = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...allEquipment.map(e => e.categoryName).filter(Boolean)])
  );
  const supplierOptions = Array.from(
    new Set([...DEFAULT_SUPPLIERS, ...allEquipment.map(e => e.supplierName).filter(Boolean)])
  );
  const meansureOptions = Array.from(
    new Set([...DEFAULT_MEASURE, ...allEquipment.map(e => e.meansureName).filter(Boolean)])
  );
  const officeOptions = Array.from(
    new Set([...DEFAULT_OFFICES, ...allEquipment.map(e => e.office).filter(Boolean)])
  );
  const modelOptions = Array.from(
    new Set([...DEFAULT_MODELS, ...allEquipment.map(e => e.model).filter(Boolean)])
  );
  const userOptions = Array.from(
    new Set([...DEFAULT_USERS, ...allEquipment.map(e => e.user).filter(Boolean)])
  );

  const [form, setForm] = useState({
    name: "",
    categoryName: "",
    supplierName: "",
    meansureName: "",
    office: "",
    model: "",
    user: "",
  });

  // Сохраняем новое оборудование в localStorage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const equipmentList = getEquipmentFromStorage();
    const newId =
      equipmentList.length > 0
        ? Math.max(...equipmentList.map((item: any) => item.id || 0)) + 1
        : 1;
    const newEquipment = {
      ...form,
      id: newId,
      serial: "",
      assignedDate: "",
      status: "active",
    };
    const updatedList = [...equipmentList, newEquipment];
    saveEquipmentToStorage(updatedList);
    router.push("/equipment");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Добавление нового оборудования</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Наименование оборудования</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5138DF]"
            placeholder="Введите наименование оборудования"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Категория</label>
            <StringArraySelect
              value={form.categoryName}
              onChange={val => setForm({ ...form, categoryName: val })}
              options={typeOptions}
              placeholder="Выберите категорию"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Поставщик</label>
            <StringArraySelect
              value={form.supplierName}
              onChange={val => setForm({ ...form, supplierName: val })}
              options={supplierOptions}
              placeholder="Выберите поставщика"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Единица измерения</label>
            <StringArraySelect
              value={form.meansureName}
              onChange={val => setForm({ ...form, meansureName: val })}
              options={meansureOptions}
              placeholder="Выберите единицу"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Офис</label>
            <StringArraySelect
              value={form.office}
              onChange={val => setForm({ ...form, office: val })}
              options={officeOptions}
              placeholder="Выберите офис"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Модель</label>
            <StringArraySelect
              value={form.model}
              onChange={val => setForm({ ...form, model: val })}
              options={modelOptions}
              placeholder="Выберите модель"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Пользователь</label>
            <StringArraySelect
              value={form.user}
              onChange={val => setForm({ ...form, user: val })}
              options={userOptions}
              placeholder="Выберите пользователя"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-[#5138DF] text-[#5138DF] rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => router.push("/equipment")}
          >
            Отменить
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#5138DF] text-white rounded-md hover:bg-[#3d2bb3] transition-colors"
          >
            Создать оборудование
          </button>
        </div>
      </form>
    </div>
  );
}