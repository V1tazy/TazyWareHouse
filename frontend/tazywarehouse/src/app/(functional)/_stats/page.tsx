"use client";

import { useEffect, useState } from 'react';
import { fetchWarehouseData, WarehouseData } from '@/services/apiService';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ServerIcon,
  BuildingStorefrontIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import { BarChart } from '@/components/Charts/BarChart';

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'movement' | 'equipment'>('inventory');
  const [selectedWarehouse, setSelectedWarehouse] = useState<'total' | number>('total');
  const [warehouseData, setWarehouseData] = useState<WarehouseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchWarehouseData();
        setWarehouseData(data);
      } catch (err) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getCurrentStats = () => {
    if (!warehouseData) return null;
    if (selectedWarehouse === 'total') {
      return warehouseData.total;
    }
    return warehouseData.warehouses.find((w) => w.id === selectedWarehouse) || warehouseData.total;
  };

  const currentStats = getCurrentStats();

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!currentStats) {
    return <div className="text-center">Нет доступных данных</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Заголовок и переключатели */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <span className="w-2 h-6 bg-purple-500 mr-2 rounded-full"></span>
          Аналитика склада
        </h2>
      </div>

      {/* Выбор склада */}
      <div className="flex mb-6 space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedWarehouse('total')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            selectedWarehouse === 'total' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <BuildingLibraryIcon className="h-5 w-5 text-purple-500" />
          <span className="ml-2">{warehouseData.total.name}</span>
        </button>

        {warehouseData.warehouses.map((warehouse) => (
          <button
            key={warehouse.id}
            onClick={() => setSelectedWarehouse(warehouse.id)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              selectedWarehouse === warehouse.id ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <BuildingStorefrontIcon className="h-5 w-5 text-blue-500" />
            <span className="ml-2">{warehouse.name}</span>
          </button>
        ))}
      </div>

      {/* Табы */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'inventory' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
        >
          Инвентарь
        </button>
        <button
          onClick={() => setActiveTab('movement')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'movement' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
        >
          Движение
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'equipment' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
        >
          Оборудование
        </button>
      </div>

      {/* Основной контент */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Карточки с метриками */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Всего единиц</h3>
            <p className="text-2xl font-bold">{currentStats.totalItems}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Оборот</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">{currentStats.turnoverRate}%</span>
              {currentStats.turnoverRate > 10 ? (
                <span className="text-green-500 text-sm flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" /> 2.4%
                </span>
              ) : (
                <span className="text-red-500 text-sm flex items-center">
                  <ArrowDownIcon className="h-4 w-4 mr-1" /> 1.2%
                </span>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Статус оборудования</h3>
            <div className="space-y-3">
              {currentStats.equipmentStatus.map((item) => (
                <div key={item.type} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ComputerDesktopIcon className="h-5 w-5 text-green-500" />
                    <span className="ml-2 text-sm">{item.type}</span>
                  </div>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Графики */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow border border-gray-100">
          {activeTab === 'inventory' && (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Распределение по категориям</h3>
              <div className="flex-1">
                <BarChart
                  data={currentStats.categories.map((c) => c.value)}
                  labels={currentStats.categories.map((c) => c.name)}
                  colors={['#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']}
                />
              </div>
            </div>
          )}

          {activeTab === 'movement' && (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Поступление и отгрузка</h3>
              <div className="flex-1">
                <BarChart
                  data={[
                    currentStats.monthlyData.map((m) => m.received),
                    currentStats.monthlyData.map((m) => m.shipped),
                  ]}
                  labels={currentStats.monthlyData.map((m) => m.month)}
                  colors={['#10B981', '#3B82F6']}
                  isStacked={false}
                  legend={['Поступило', 'Отгружено']}
                />
              </div>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Статистика оборудования</h3>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">График по оборудованию</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}