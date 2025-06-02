"use client"; // Клиентский компонент для интерактивности

import { useEffect, useState } from "react";
import { Table } from "@/components/Table/Table";
import { EquipmentTableConfig } from "@/config/TableConfig/EquipmentTableConfig";
import { fetchProfileData, fetchProfileUpdateData, ProfileData } from "@/services/profile.service";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (status === "loading") {
      return; // Пока сессия загружается, ничего не делаем
    }

    if (session?.user?.email) {
      fetchProfileData(session.user.email)
        .then((data) => {
          setProfileData(data);
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("Не удалось получить данные сессии.");
    }
  }, [session, status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      setError("Не удалось получить email пользователя.");
      return;
    }

    try {
      const updatedProfile = await fetchProfileUpdateData(
        session.user.email,
        formData.firstName,
        formData.lastName,
        formData.phoneNumber
      );
      setProfileData(updatedProfile);
      setIsModalOpen(false); // Закрыть модальное окно после успешного обновления
    } catch (err: any) {
      setError(err.message || "Ошибка при обновлении профиля.");
    }
  };

  if (loading || status === "loading") {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Ошибка: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Профиль пользователя</h1>
            <button
              onClick={() => setIsModalOpen(true)} // Открыть модальное окно
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <span className="mr-2">✏️</span>
              Редактировать профиль
            </button>
          </div>

        {/* Карточка профиля */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src="/plug_img.png"
                alt="Фото пользователя"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {profileData?.firstName} {profileData?.lastName}
                </h2>
                <p className="text-gray-600">{profileData?.email}</p>
                <p className="text-gray-600">{profileData?.phoneNumber}</p>
              </div>
            </div>
        </div>

        {/* Закреплённое оборудование */}
        <Table
          title="Закреплённое оборудование"
          data={mockEquipment}
          columns={EquipmentTableConfig}
        />

        <br />
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
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Редактировать профиль</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Имя</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Закрыть модальное окно
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Мок-данные оборудования
const mockEquipment = [
  { id: 1, type: "Ноутбук", model: "Dell XPS", serial: "XYZ123", status: "Активно", user: "Иван Петров", warranty: "2026-04-01" },
  { id: 2, type: "Кресло", model: "Офисное", serial: "ABC456", status: "Активно", user: "Иван Петров", warranty: "2027-03-15" },
];

// Мок-данные активности
const mockActivity = [
  { id: 1, action: "Подписал накладную №001", timestamp: "2025-05-14 09:30" },
  { id: 2, action: "Переместил оборудование в офис №2", timestamp: "2025-05-13 14:20" },
];