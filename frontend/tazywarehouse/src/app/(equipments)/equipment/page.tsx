"use client";

import { useEffect, useState } from "react";
import { mockEquipment } from "@/data/MockData";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

// --- CardList и Card ---
function Card({ id, image, title, details, type }: any) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/equipment/edit/${id}`);
  };

  return (
    <div className="flex items-start bg-white rounded-lg shadow p-4">
      <div className="w-24 h-24 bg-gray-100 rounded-md mr-4 flex items-center justify-center overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">{title}</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {details.map((detail: any, index: number) => (
            <span key={index} className="text-sm text-gray-500">
              {detail.label}: {detail.value}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 ml-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={handleEdit}
        >
          Редактировать
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={() => alert("Описание " + id)}
        >
          Описание
        </button>
      </div>
    </div>
  );
}

function CardList({ items }: { items: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 ? (
        items.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            image={item.image}
            title={item.title}
            details={item.details}
            type={item.type}
          />
        ))
      ) : (
        <p className="text-center text-sm text-gray-500">Оборудование не найдено.</p>
      )}
    </div>
  );
}

// --- SelectBar ---
function StringArraySelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <select
      className="w-full border rounded-md px-2 py-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// --- Filter ---
function Filter({
  categoryList = [],
  supplierList = [],
  warehouseList = [],
  officeList = [],
  modelList = [],
  userList = [],
  category,
  setCategory,
  supplier,
  setSupplier,
  warehouse,
  setWarehouse,
  office,
  setOffice,
  model,
  setModel,
  user,
  setUser,
  onClear,
}: any) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Категория</label>
        <StringArraySelect
          options={categoryList}
          value={category}
          onChange={setCategory}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Поставщик</label>
        <StringArraySelect
          options={supplierList}
          value={supplier}
          onChange={setSupplier}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Склад</label>
        <StringArraySelect
          options={warehouseList}
          value={warehouse}
          onChange={setWarehouse}
        />
      </div>
      {officeList && officeList.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Офис</label>
          <StringArraySelect
            options={officeList}
            value={office}
            onChange={setOffice}
          />
        </div>
      )}
      {modelList && modelList.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Модель</label>
          <StringArraySelect
            options={modelList}
            value={model}
            onChange={setModel}
          />
        </div>
      )}
      {userList && userList.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Пользователь</label>
          <StringArraySelect
            options={userList}
            value={user}
            onChange={setUser}
          />
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClear}
        >
          Очистить
        </button>
      </div>
    </div>
  );
}

// --- SearchBar ---
function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

// --- Основная страница ---
const ITEMS_PER_PAGE = 8;
const STORAGE_KEY = "tazywarehouse_equipment";
const OFFICE_STORAGE_KEY = "tazywarehouse_offices";

// Получить список офисов из localStorage
function getOfficeNamesFromStorage() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(OFFICE_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data).map((o: any) => o.name);
    } catch {
      return [];
    }
  }
  return [];
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

function getEquipmentByOffice(officeName: string) {
  const equipment = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return equipment.filter((e: any) => e.office === officeName);
}

export default function EquipmentPage() {
  const [allEquipment, setAllEquipment] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтры
  const [category, setCategory] = useState("Категория");
  const [supplier, setSupplier] = useState("Поставщики");
  const [warehouse, setWarehouse] = useState("Склады");
  const [office, setOffice] = useState("Офисы");
  const [model, setModel] = useState("Модели");
  const [user, setUser] = useState("Пользователи");
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const officeFromQuery = searchParams.get("office");

  // Загружаем данные из localStorage при монтировании и при возврате на страницу
  useEffect(() => {
    function syncEquipment() {
      setAllEquipment(getEquipmentFromStorage());
    }
    syncEquipment();
    window.addEventListener("focus", syncEquipment);
    window.addEventListener("storage", syncEquipment);
    return () => {
      window.removeEventListener("focus", syncEquipment);
      window.removeEventListener("storage", syncEquipment);
    };
  }, []);

  useEffect(() => {
    if (officeFromQuery && officeFromQuery !== office) {
      setOffice(officeFromQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [officeFromQuery]);

  // Фильтрация по всем фильтрам и поиску
  useEffect(() => {
    let data = [...allEquipment];
    if (category && category !== "Категория")
      data = data.filter((p) => p.categoryName === category);
    if (supplier && supplier !== "Поставщики")
      data = data.filter((p) => p.supplierName === supplier);
    if (warehouse && warehouse !== "Склады")
      data = data.filter((p) => p.warehouseName === warehouse);
    if (office && office !== "Офисы")
      data = data.filter((p) => p.office === office);
    if (model && model !== "Модели")
      data = data.filter((p) => p.model === model);
    if (user && user !== "Пользователи")
      data = data.filter((p) => p.user === user);
    if (search)
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(data);
    // Сброс страницы только если текущая страница вне диапазона
    if (currentPage > Math.ceil(data.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [allEquipment, category, supplier, warehouse, office, model, user, search]);

  // Сброс фильтров
  const clearFilters = () => {
    setCategory("Категория");
    setSupplier("Поставщики");
    setWarehouse("Склады");
    setOffice("Офисы");
    setModel("Модели");
    setUser("Пользователи");
    setSearch("");
  };

  // Пагинация
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Для CardList
  const cardItems = paginated.map((p: any) => ({
    id: p.id,
    image: "/plug_img.png",
    title: p.name,
    details: [
      { label: "Категория", value: p.categoryName },
      { label: "Вид измерения", value: p.meansureName },
      { label: "Поставщик", value: p.supplierName },
    ],
    type: "Оборудование",
  }));

  // Получение списков для фильтров
  const [officeList, setOfficeList] = useState<string[]>(["Офисы"]);

  useEffect(() => {
    // Получаем список офисов для фильтра
    const offices = getOfficeNamesFromStorage();
    setOfficeList(["Офисы", ...offices]);
  }, [allEquipment]);

  const categoryList = [
    "Категория",
    ...Array.from(
      new Set(allEquipment.map((p: any) => p.categoryName).filter(Boolean))
    ),
  ];
  const supplierList = [
    "Поставщики",
    ...Array.from(
      new Set(allEquipment.map((p: any) => p.supplierName).filter(Boolean))
    ),
  ];
  const warehouseList = [
    "Склады",
    ...Array.from(
      new Set(allEquipment.map((p: any) => p.warehouseName).filter(Boolean))
    ),
  ];
  const modelList = [
    "Модели",
    ...Array.from(
      new Set(allEquipment.map((p: any) => p.model).filter(Boolean))
    ),
  ];
  const userList = [
    "Пользователи",
    ...Array.from(
      new Set(allEquipment.map((p: any) => p.user).filter(Boolean))
    ),
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Оборудование</h1>
          <Link
            href="/equipment/add"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Добавить оборудование
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-blue-500 mr-2 rounded-full"></span>
            Фильтры
          </h2>
          <Filter
            categoryList={categoryList}
            supplierList={supplierList}
            warehouseList={warehouseList}
            officeList={officeList}
            modelList={modelList}
            userList={userList}
            category={category}
            setCategory={setCategory}
            supplier={supplier}
            setSupplier={setSupplier}
            warehouse={warehouse}
            setWarehouse={setWarehouse}
            office={office}
            setOffice={setOffice}
            model={model}
            setModel={setModel}
            user={user}
            setUser={setUser}
            onClear={clearFilters}
          />
        </section>

        <section className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
            Список оборудования
          </h2>
          <div className="mb-4">
            <SearchBar
              placeholder="Поиск по названию оборудования..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <CardList items={cardItems} />
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}