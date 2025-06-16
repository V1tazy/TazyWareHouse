"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { mockEquipment } from "@/data/MockData";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

interface EquipmentItem {
  id: string;
  name: string;
  categoryName: string;
  meansureName: string;
  supplierName: string;
  warehouseName: string;
  office?: string;
  model?: string;
  user?: string;
}

interface CardProps {
  id: string;
  image: string;
  title: string;
  details: { label: string; value: string }[];
  type: string;
}

interface FilterProps {
  categoryList: string[];
  supplierList: string[];
  warehouseList: string[];
  officeList: string[];
  modelList: string[];
  userList: string[];
  category: string;
  setCategory: (value: string) => void;
  supplier: string;
  setSupplier: (value: string) => void;
  warehouse: string;
  setWarehouse: (value: string) => void;
  office: string;
  setOffice: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
  user: string;
  setUser: (value: string) => void;
  onClear: () => void;
}

// --- Card Component ---
function Card({ id, image, title, details, type }: CardProps) {
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
          priority={false}
        />
      </div>
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">{title}</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {details.map((detail, index) => (
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

// --- CardList Component ---
function CardList({ items }: { items: CardProps[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 ? (
        items.map((item) => (
          <Card
            key={item.id}
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

// --- SelectBar Component ---
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
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// --- Filter Component ---
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
}: FilterProps) {
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
      {officeList.length > 1 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Офис</label>
          <StringArraySelect
            options={officeList}
            value={office}
            onChange={setOffice}
          />
        </div>
      )}
      {modelList.length > 1 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Модель</label>
          <StringArraySelect
            options={modelList}
            value={model}
            onChange={setModel}
          />
        </div>
      )}
      {userList.length > 1 && (
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

// --- SearchBar Component ---
function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

function getOfficeNamesFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(OFFICE_STORAGE_KEY);
  if (data) {
    try {
      const offices = JSON.parse(data);
      return Array.isArray(offices) ? offices.map((o: { name: string }) => o.name) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function getEquipmentFromStorage(): EquipmentItem[] {
  if (typeof window === "undefined") {
    // Приводим объекты mockEquipment к EquipmentItem
    return mockEquipment.map((item: any) => ({
      id: String(item.id ?? ""),
      name: item.name ?? "",
      categoryName: item.categoryName ?? "",
      meansureName: item.meansureName ?? "",
      supplierName: item.supplierName ?? "",
      warehouseName: item.warehouseName ?? "",
      office: item.office ?? "",
      model: item.model ?? "",
      user: item.user ?? "",
    }));
  }
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      // Аналогично для fallback
      return mockEquipment.map((item: any) => ({
        id: String(item.id ?? ""),
        name: item.name ?? "",
        categoryName: item.categoryName ?? "",
        meansureName: item.meansureName ?? "",
        supplierName: item.supplierName ?? "",
        warehouseName: item.warehouseName ?? "",
        office: item.office ?? "",
        model: item.model ?? "",
        user: item.user ?? "",
      }));
    }
  }
  return mockEquipment.map((item: any) => ({
    id: String(item.id ?? ""),
    name: item.name ?? "",
    categoryName: item.categoryName ?? "",
    meansureName: item.meansureName ?? "",
    supplierName: item.supplierName ?? "",
    warehouseName: item.warehouseName ?? "",
    office: item.office ?? "",
    model: item.model ?? "",
    user: item.user ?? "",
  }));
}

function EquipmentPageWithSearchParams(props: { 
  allEquipment: EquipmentItem[];
  officeList: string[];
  categoryList: string[];
  supplierList: string[];
  warehouseList: string[];
  modelList: string[];
  userList: string[];
}) {
  const {
    allEquipment,
    officeList,
    categoryList,
    supplierList,
    warehouseList,
    modelList,
    userList,
  } = props;

  const [filtered, setFiltered] = useState<EquipmentItem[]>([]);
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

  useEffect(() => {
    if (officeFromQuery && officeFromQuery !== office) {
      setOffice(officeFromQuery);
    }
  }, [officeFromQuery, office]);

  // Фильтрация
  useEffect(() => {
    let data = [...allEquipment];
    
    if (category && category !== "Категория") {
      data = data.filter((p) => p.categoryName === category);
    }
    if (supplier && supplier !== "Поставщики") {
      data = data.filter((p) => p.supplierName === supplier);
    }
    if (warehouse && warehouse !== "Склады") {
      data = data.filter((p) => p.warehouseName === warehouse);
    }
    if (office && office !== "Офисы") {
      data = data.filter((p) => p.office === office);
    }
    if (model && model !== "Модели") {
      data = data.filter((p) => p.model === model);
    }
    if (user && user !== "Пользователи") {
      data = data.filter((p) => p.user === user);
    }
    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
    if (currentPage > Math.ceil(data.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [allEquipment, category, supplier, warehouse, office, model, user, search, currentPage]);

  const clearFilters = useCallback(() => {
    setCategory("Категория");
    setSupplier("Поставщики");
    setWarehouse("Склады");
    setOffice("Офисы");
    setModel("Модели");
    setUser("Пользователи");
    setSearch("");
  }, []);

  // Пагинация
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Преобразование данных для CardList
  const cardItems = paginated.map((p) => ({
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

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Оборудование</h1>
          <Link
            href="/equipment/add"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
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

// --- Основная страница с параметрами поиска ---
export default function EquipmentPage() {
  // Получаем данные для фильтров и оборудования до Suspense
  const [allEquipment, setAllEquipment] = useState<EquipmentItem[]>([]);
  const [officeList, setOfficeList] = useState<string[]>(["Офисы"]);

  useEffect(() => {
    setAllEquipment(getEquipmentFromStorage());
    setOfficeList(["Офисы", ...getOfficeNamesFromStorage()]);
  }, []);

  // Получаем списки для фильтров
  const getUniqueValues = (key: keyof EquipmentItem) => [
    ...new Set(allEquipment.map((p) => p[key]).filter(Boolean) as string[]),
  ];

  const categoryList = ["Категория", ...getUniqueValues("categoryName")];
  const supplierList = ["Поставщики", ...getUniqueValues("supplierName")];
  const warehouseList = ["Склады", ...getUniqueValues("warehouseName")];
  const modelList = ["Модели", ...getUniqueValues("model")];
  const userList = ["Пользователи", ...getUniqueValues("user")];

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <EquipmentPageWithSearchParams
        allEquipment={allEquipment}
        officeList={officeList}
        categoryList={categoryList}
        supplierList={supplierList}
        warehouseList={warehouseList}
        modelList={modelList}
        userList={userList}
      />
    </Suspense>
  );
}