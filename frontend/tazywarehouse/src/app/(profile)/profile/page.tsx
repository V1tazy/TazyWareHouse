"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/Table/Table";
import { EquipmentTableConfig } from "@/config/TableConfig/EquipmentTableConfig";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Profile {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface Activity {
  id: number;
  action: string;
  timestamp: string;
}

interface Equipment {
  id: number;
  type: string;
  model: string;
  serial: string;
  status: string;
  user: string;
  warranty: string;
}

const PROFILE_KEY = "tazywarehouse_profiles";
const CURRENT_USER_KEY = "tazywarehouse_current_user";

function getProfile(email: string): Profile | null {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || "[]");
  return profiles.find((p: Profile) => p.email === email) || null;
}

function saveProfile(profile: Profile): void {
  const profiles: Profile[] = JSON.parse(localStorage.getItem(PROFILE_KEY) || "[]");
  const idx = profiles.findIndex((p: Profile) => p.email === profile.email);
  if (idx !== -1) {
    profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) {
      setError("Вы не авторизованы.");
      setLoading(false);
      return;
    }

    const profile = getProfile(email);
    if (profile) {
      setProfileData(profile);
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
      });
    } else {
      const newProfile: Profile = {
        email,
        firstName: "",
        lastName: "",
        phoneNumber: "",
      };
      saveProfile(newProfile);
      setProfileData(newProfile);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });
    }
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) {
      setError("Не удалось получить email пользователя.");
      return;
    }
    const updatedProfile: Profile = {
      ...profileData,
      ...formData,
      email,
    };
    saveProfile(updatedProfile);
    setProfileData(updatedProfile);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Ошибка: {error}</p>
      </div>
    );
  }

  // Мок-данные (можно заменить на реальные данные из API)
  const mockEquipment: Equipment[] = [
    { id: 1, type: "Ноутбук", model: "Dell XPS", serial: "XYZ123", status: "Активно", user: "Иван Петров", warranty: "2026-04-01" },
    { id: 2, type: "Кресло", model: "Офисное", serial: "ABC456", status: "Активно", user: "Иван Петров", warranty: "2027-03-15" },
  ];

  const mockActivity: Activity[] = [
    { id: 1, action: "Подписал накладную №001", timestamp: "2025-05-14 09:30" },
    { id: 2, action: "Переместил оборудование в офис №2", timestamp: "2025-05-13 14:20" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Профиль пользователя</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <span className="mr-2">✏️</span>
            Редактировать профиль
          </button>
        </div>

        {/* Карточка профиля */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-32 h-32 relative rounded-full overflow-hidden">
              <Image
                src="/plug_img.png"
                alt="Фото пользователя"
                width={128}
                height={128}
                className="object-cover"
                priority={false}
              />
            </div>
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
          data={mockEquipment.map(e => ({ ...e, id: String(e.id) }))}
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
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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