"use client"; // Client component for interactivity

import { StringArraySelect } from "../SelectBar";


export default function Filter({
  categoryList = [],
  supplierList = [],
  warehouseList = [],
  category,
  setCategory,
  supplier,
  setSupplier,
  warehouse,
  setWarehouse
}: any) {
  const handlerFilterButton = () => {
    // Логика применения фильтров (пустая в исходном коде)
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Фильтр по категории */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Категория</label>
        <StringArraySelect
          options={categoryList}
          value={category}
          onChange={setCategory}
          placeholder="Выберите категорию"
        />
      </div>

      {/* Фильтр по поставщику */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Поставщик</label>
        <StringArraySelect
          options={supplierList}
          value={supplier}
          onChange={setSupplier}
          placeholder="Выберите поставщика"
        />
      </div>

      {/* Фильтр по складу */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Склад</label>
        <StringArraySelect
          options={warehouseList}
          value={warehouse}
          onChange={setWarehouse}
          placeholder="Выберите склад"
        />
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