"use client"; // Client component for interactivity

import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ICard {
  id: string;
  image: string;
  title: string;
  details: { label: string; value: string }[];
  type: string;
}

export default function Card({ id, image, title, details, type }: ICard) {
  const router = useRouter();

  const CardEditHandler = () => {
    router.push(type?.toLowerCase() === "оборудование" ? `/equipment/edit/${id}` : `/product/edit/${id}`);
  };

  const CardAboutHandler = () => {
    router.push(type?.toLowerCase() === "оборудование" ? `/equipment/about/${id}` : `/product/about/${id}`);
  };

  return (
    <div className="flex items-start bg-white rounded-lg shadow p-4">
      {/* Изображение */}
      <div className="w-24 h-24 bg-gray-100 rounded-md mr-4 flex items-center justify-center overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Детали */}
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">{title}</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {details.map((detail, index) => (
            <span key={index} className="text-sm text-gray-500">
              {detail.label}: {detail.value}
            </span>
          ))}
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col items-center gap-2 ml-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={CardEditHandler}
        >
          Редактировать
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={CardAboutHandler}
        >
          Описание
        </button>
      </div>
    </div>
  );
}