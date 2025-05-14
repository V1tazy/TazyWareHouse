"use client"; // Client component for interactivity

import { PRODUCT_LIST } from "@/@libs/data/products";
import CardList from "@/components/CardList";
import Filter from "@/components/Filter";
import PaginationBar from "@/components/PaginationBar";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ProductPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      {/* Заголовок */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Продукты</h1>
          <Link
            href="/products/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Добавить продукт
          </Link>
        </div>
      </header>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Фильтры */}
        <section className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-blue-500 mr-2 rounded-full"></span>
            Фильтры
          </h2>
          <Filter />
        </section>

        {/* Поиск и список продуктов */}
        <section className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
            Список продуктов
          </h2>
          <div className="mb-4">
            <SearchBar placeholder="Поиск по названию продукта..." />
          </div>
          <CardList items={PRODUCT_LIST} />
        </section>
      </div>

      {/* Пагинация */}
      <section className="mt-6 flex justify-center gap-2">
        <PaginationBar />
      </section>
    </div>
  );
}