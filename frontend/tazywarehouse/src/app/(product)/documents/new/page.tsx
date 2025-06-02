"use client";

import { useRouter } from "next/navigation";
import { useDocument } from "@/hooks/useDocument";
import { DocumentForm } from "@/components/DocumentForm/Component";
import { useSession } from "next-auth/react";

export default function NewDocumentPage() {
  const router = useRouter();
  const { createDocument, templates, error } = useDocument();
  const { data: session, status } = useSession();

  const handleSubmit = async (data: any) => {
    if (!session?.user?.email) {
      console.error("Не удалось получить email пользователя из сессии.");
      return;
    }

    // Добавляем email текущего пользователя в данные
    const documentData = {
      ...data,
      userEmail: session.user.email, // Передаем email на сервер
    };

    console.log("Отправляемые данные:", documentData); // Для отладки

    try {
      await createDocument(documentData);
      router.push("/documents");
    } catch (err) {
      console.error("Ошибка при создании документа:", err);
    }
  };

  if (status === "loading") {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Создать документ</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <DocumentForm templates={templates} onSubmit={handleSubmit} />
    </div>
  );
}