"use client";

import { StringArraySelect } from "../SelectBar";

export default function Filter({
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
  onApply,
  onClear,
}: any) {
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

      {/* Фильтр по офису */}
      {officeList && officeList.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Офис</label>
          <StringArraySelect
            options={officeList}
            value={office}
            onChange={setOffice}
            placeholder="Выберите офис"
          />
        </div>
      )}

      {/* Фильтр по модели */}
      {modelList && modelList.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Модель</label>
          <StringArraySelect
            options={modelList}
            value={model}
            onChange={setModel}
            placeholder="Выберите модель"
          />
        </div>
      )}

      {/* Фильтр по пользователю */}
      {userList && userList.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Пользователь</label>
          <StringArraySelect
            options={userList}
            value={user}
            onChange={setUser}
            placeholder="Выберите пользователя"
          />
        </div>
      )}

      {/* Кнопки */}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onApply}
        >
          Применить
        </button>
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