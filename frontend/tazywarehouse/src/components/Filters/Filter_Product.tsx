"use client"; // Client component for interactivity

import { StringArraySelect } from "../SelectBar";


const STATUS_LIST = ['Выберите статус']

const CATEGORY_LIST = ['Категория']

const SUPLIER_LIST = ['Поставщики']

const WAREHOUSE_LIST = ['Склады']


export default function Filter() {
  const handlerFilterButton = () => {
    // Логика применения фильтров (пустая в исходном коде)
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Фильтр по статусу */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Статус</label>
        <StringArraySelect options={STATUS_LIST} placeholder="Выберите статус" />
      </div>

      {/* Фильтр по категории */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Категория</label>
        <StringArraySelect options={CATEGORY_LIST} placeholder="Выберите категорию" />
      </div>

      {/* Фильтр по поставщику */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Поставщик</label>
        <StringArraySelect options={SUPLIER_LIST} placeholder="Выберите поставщика" />
      </div>

      {/* Фильтр по цене */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Цена</label>
        <input
          placeholder="От"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="До"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Фильтр по складу */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Склад</label>
        <StringArraySelect options={WAREHOUSE_LIST} placeholder="Выберите склад" />
      </div>

      {/* Кнопки */}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handlerFilterButton}
        >
          Применить
        </button>
        <button
          type="button"
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Очистить
        </button>
      </div>
    </div>
  );
}