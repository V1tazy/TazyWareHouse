"use client"; // Клиентский компонент для интерактивности

import { useState } from "react";
import Link from "next/link";
import { PencilIcon, LockClosedIcon, ComputerDesktopIcon, ClockIcon } from "@heroicons/react/24/outline";
import { User } from "@/data/User";

// Мок-данные пользователя (заменить на API)
const mockUser = {
  id: 1,
  name: "Иван Петров",
  position: "Менеджер склада",
  phone: "+7 (999) 123-45-67",
  email: "ivan.petrov@example.com",
  photo: "https://via.placeholder.com/150",
  roles: ["Админ", "Кладовщик"],
  permissions: ["Управление складом", "Подписание документов"],
};

// Мок-данные оборудования
const mockEquipment = [
  { id: 1, name: "Ноутбук Dell XPS", serial: "XYZ123", assignedDate: "2025-04-01", status: "Активно" },
  { id: 2, name: "Офисное кресло", serial: "ABC456", assignedDate: "2025-03-15", status: "Активно" },
];

// Мок-данные активности
const mockActivity = [
  { id: 1, action: "Подписал накладную №001", timestamp: "2025-05-14 09:30" },
  { id: 2, action: "Переместил оборудование в офис №2", timestamp: "2025-05-13 14:20" },
];


export default function ProfilePage() {
  // Состояние для настроек и редактирования
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState("светлая");
  const [twoFA, setTwoFA] = useState(false);

  // Сохранение изменений профиля
  const handleSave = () => {
    setIsEditing(false);
    // TODO: Вызов API для сохранения данных
    alert("Профиль обновлён!");
  };

  // Переключение темы
  const toggleTheme = () => {
    setTheme(theme === "светлая" ? "тёмная" : "светлая");
    // TODO: Применить тему (например, через CSS-классы или localStorage)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-6">
          <h1 className=" Thursday, May 15, 2025text-2xl font-bold text-gray-900">Профиль пользователя</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            {isEditing ? "Отмена" : "Редактировать профиль"}
          </button>
        </div>

        {/* Карточка профиля */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={user.photo}
              alt="Фото пользователя"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ФИО"
                  />
                  <input
                    type="text"
                    value={user.position}
                    onChange={(e) => setUser({ ...user, position: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Должность"
                  />
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Телефон"
                  />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Сохранить изменения
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.position}</p>
                  <p className="text-gray-600">{user.phone}</p>
                  <p className="text-gray-600">{user.email}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Права доступа */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Права доступа</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Роли</h4>
              <ul className="mt-2 space-y-1">
                {user.roles.map((role) => (
                  <li key={role} className="text-gray-600">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Разрешения</h4>
              <ul className="mt-2 space-y-1">
                {user.permissions.map((permission) => (
                  <li key={permission} className="text-gray-600">{permission}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Закреплённое оборудование */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Закреплённое оборудование</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Наименование</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Серийный номер</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата закрепления</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockEquipment.length > 0 ? (
                  mockEquipment.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.serial}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.assignedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === "Активно" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/equipment/${item.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Просмотреть
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Оборудование не закреплено.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Лог активности */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние действия</h3>
          <div className="space-y-4">
            {mockActivity.length > 0 ? (
              mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Нет недавних действий.</p>
            )}
          </div>
        </div>

        {/* Настройки */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки</h3>
          <div className="space-y-4">
            <div>
              <button
                onClick={() => alert("Инициирована смена пароля...")} // Заменить на модальное окно или форму
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Сменить пароль
              </button>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700">Двухфакторная аутентификация</label>
              <input
                type="checkbox"
                checked={twoFA}
                onChange={() => setTwoFA(!twoFA)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700">Тема интерфейса</label>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Переключить на {theme === "светлая" ? "тёмную" : "светлую"} тему
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}