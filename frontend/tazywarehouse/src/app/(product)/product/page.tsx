"use client";

import CardList from "@/components/CardList";
import Filter from "@/components/Filters/Filter_Product";
import PaginationBar from "@/components/PaginationBar";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтры
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5149/api/Product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  // Фильтрация
  useEffect(() => {
    let data = [...products];
    if (category && category !== "Категория")
      data = data.filter((p) => p.categoryName === category);
    if (supplier && supplier !== "Поставщики")
      data = data.filter((p) => p.supplierName === supplier);
    if (warehouse && warehouse !== "Склады")
      data = data.filter((p) => p.warehouseName === warehouse);
    if (search)
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(data);
    setCurrentPage(1);
  }, [category, supplier, warehouse, search, products]);

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
    type: "Продукт",
  }));

  // Получение списков для фильтров
  const categoryList = [
    "Категория",
    ...Array.from(
      new Set(products.map((p: any) => p.categoryName).filter(Boolean))
    ),
  ];
  const supplierList = [
    "Поставщики",
    ...Array.from(
      new Set(products.map((p: any) => p.supplierName).filter(Boolean))
    ),
  ];
  const warehouseList = [
    "Склады",
    ...Array.from(
      new Set(products.map((p: any) => p.warehouseName).filter(Boolean))
    ),
  ];

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Продукты</h1>
          <Link
            href="/product/add"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Добавить продукт
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
            category={category}
            setCategory={setCategory}
            supplier={supplier}
            setSupplier={setSupplier}
            warehouse={warehouse}
            setWarehouse={setWarehouse}
          />
        </section>

        <section className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
            Список продуктов
          </h2>
          <div className="mb-4">
            <SearchBar
              placeholder="Поиск по названию продукта..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <CardList items={cardItems} />
        </section>
      </div>
    </div>
  );
}