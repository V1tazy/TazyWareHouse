"use client"

import { 
  ArrowUpIcon,
  ArrowDownIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ServerIcon,
  BuildingStorefrontIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { BarChart } from "@/components/Charts/BarChart";

// Моковые данные для демонстрации с несколькими складами
const warehouseData = {
  total: {
    name: "Общая статистика",
    icon: <BuildingLibraryIcon className="h-5 w-5 text-purple-500" />,
    totalItems: 5242,
    turnoverRate: 15.4,
    categories: [
      { name: 'Офисная техника', value: 35 },
      { name: 'Комплектующие', value: 25 },
      { name: 'Мебель', value: 20 },
      { name: 'Хозтовары', value: 15 },
      { name: 'Прочее', value: 5 }
    ],
    monthlyData: [
      { month: 'Янв', received: 320, shipped: 295 },
      { month: 'Фев', received: 350, shipped: 320 },
      { month: 'Мар', received: 480, shipped: 450 },
      { month: 'Апр', received: 290, shipped: 310 },
      { month: 'Май', received: 360, shipped: 340 },
      { month: 'Июн', received: 340, shipped: 330 }
    ],
    equipmentStatus: [
      { type: 'Рабочие', count: 542, icon: <ComputerDesktopIcon className="h-5 w-5 text-green-500" /> },
      { type: 'На ремонте', count: 18, icon: <DevicePhoneMobileIcon className="h-5 w-5 text-yellow-500" /> },
      { type: 'Списано', count: 15, icon: <ServerIcon className="h-5 w-5 text-red-500" /> }
    ]
  },
  warehouses: [
    {
      id: 1,
      name: "Основной склад",
      icon: <BuildingStorefrontIcon className="h-5 w-5 text-blue-500" />,
      totalItems: 1242,
      turnoverRate: 12.4,
      categories: [
        { name: 'Офисная техника', value: 35 },
        { name: 'Комплектующие', value: 25 },
        { name: 'Мебель', value: 20 },
        { name: 'Хозтовары', value: 15 },
        { name: 'Прочее', value: 5 }
      ],
      monthlyData: [
        { month: 'Янв', received: 120, shipped: 95 },
        { month: 'Фев', received: 150, shipped: 120 },
        { month: 'Мар', received: 180, shipped: 150 },
        { month: 'Апр', received: 90, shipped: 110 },
        { month: 'Май', received: 160, shipped: 140 },
        { month: 'Июн', received: 140, shipped: 130 }
      ],
      equipmentStatus: [
        { type: 'Рабочие', count: 142, icon: <ComputerDesktopIcon className="h-5 w-5 text-green-500" /> },
        { type: 'На ремонте', count: 8, icon: <DevicePhoneMobileIcon className="h-5 w-5 text-yellow-500" /> },
        { type: 'Списано', count: 5, icon: <ServerIcon className="h-5 w-5 text-red-500" /> }
      ]
    },
    {
      id: 2,
      name: "Запасной склад",
      icon: <BuildingStorefrontIcon className="h-5 w-5 text-green-500" />,
      totalItems: 2000,
      turnoverRate: 18.2,
      categories: [
        { name: 'Офисная техника', value: 25 },
        { name: 'Комплектующие', value: 35 },
        { name: 'Мебель', value: 15 },
        { name: 'Хозтовары', value: 20 },
        { name: 'Прочее', value: 5 }
      ],
      monthlyData: [
        { month: 'Янв', received: 100, shipped: 100 },
        { month: 'Фев', received: 100, shipped: 100 },
        { month: 'Мар', received: 200, shipped: 200 },
        { month: 'Апр', received: 100, shipped: 100 },
        { month: 'Май', received: 100, shipped: 100 },
        { month: 'Июн', received: 100, shipped: 100 }
      ],
      equipmentStatus: [
        { type: 'Рабочие', count: 200, icon: <ComputerDesktopIcon className="h-5 w-5 text-green-500" /> },
        { type: 'На ремонте', count: 5, icon: <DevicePhoneMobileIcon className="h-5 w-5 text-yellow-500" /> },
        { type: 'Списано', count: 5, icon: <ServerIcon className="h-5 w-5 text-red-500" /> }
      ]
    },
    {
      id: 3,
      name: "Склад №3",
      icon: <BuildingStorefrontIcon className="h-5 w-5 text-orange-500" />,
      totalItems: 2000,
      turnoverRate: 15.5,
      categories: [
        { name: 'Офисная техника', value: 20 },
        { name: 'Комплектующие', value: 30 },
        { name: 'Мебель', value: 25 },
        { name: 'Хозтовары', value: 20 },
        { name: 'Прочее', value: 5 }
      ],
      monthlyData: [
        { month: 'Янв', received: 100, shipped: 100 },
        { month: 'Фев', received: 100, shipped: 100 },
        { month: 'Мар', received: 100, shipped: 100 },
        { month: 'Апр', received: 100, shipped: 100 },
        { month: 'Май', received: 100, shipped: 100 },
        { month: 'Июн', received: 100, shipped: 100 }
      ],
      equipmentStatus: [
        { type: 'Рабочие', count: 200, icon: <ComputerDesktopIcon className="h-5 w-5 text-green-500" /> },
        { type: 'На ремонте', count: 5, icon: <DevicePhoneMobileIcon className="h-5 w-5 text-yellow-500" /> },
        { type: 'Списано', count: 5, icon: <ServerIcon className="h-5 w-5 text-red-500" /> }
      ]
    }
  ]
};

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'movement' | 'equipment'>('inventory');
  const [selectedWarehouse, setSelectedWarehouse] = useState<'total' | number>('total');

  // Получаем данные для выбранного склада
  const getCurrentStats = () => {
    if (selectedWarehouse === 'total') {
      return warehouseData.total;
    }
    return warehouseData.warehouses.find(w => w.id === selectedWarehouse) || warehouseData.total;
  };

  const currentStats = getCurrentStats();

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
          className={`flex items-center px-4 py-2 rounded-lg ${selectedWarehouse === 'total' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
        >
          {warehouseData.total.icon}
          <span className="ml-2">{warehouseData.total.name}</span>
        </button>
        
        {warehouseData.warehouses.map(warehouse => (
          <button
            key={warehouse.id}
            onClick={() => setSelectedWarehouse(warehouse.id)}
            className={`flex items-center px-4 py-2 rounded-lg ${selectedWarehouse === warehouse.id ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
          >
            {warehouse.icon}
            <span className="ml-2">{warehouse.name}</span>
          </button>
        ))}
      </div>

      {/* Табы */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'inventory' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
        >
          Инвентарь
        </button>
        <button
          onClick={() => setActiveTab('movement')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'movement' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
        >
          Движение
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'equipment' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
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
                    {item.icon}
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
                    data={currentStats.categories.map(c => c.value)}
                    labels={currentStats.categories.map(c => c.name)}
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
                    currentStats.monthlyData.map(m => m.received),
                    currentStats.monthlyData.map(m => m.shipped)
                  ]}
                  labels={currentStats.monthlyData.map(m => m.month)}
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