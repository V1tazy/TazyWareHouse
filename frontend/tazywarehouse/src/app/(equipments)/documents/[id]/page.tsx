"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDocument } from "@/hooks/useDocument";
import Link from "next/link";

export default function DocumentDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { getDocument } = useDocument();
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getDocument(id as string).then(setDocument);
    }
  }, [id]);

  if (!document) {
    return <div className="min-h-screen p-4 max-w-7xl mx-auto">Документ не найден</div>;
  }

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{document.name}</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Детали документа</h2>
          <p><strong>Тип:</strong> {document.documentTypeId}</p>
          <p><strong>Статус:</strong> {document.status}</p>
          <p><strong>Ответственный:</strong> {document.userEmail || "Не указан"}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Описание</h2>
          <div className="p-4 border rounded-md bg-gray-50">
            {document.description || "Нет описания"}
          </div>
        </div>
        <div className="flex space-x-4">
          {document.status === "Черновик" && (
            <Link
              href={`/documents/${document.id}/edit`}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Редактировать
            </Link>
          )}
          {document.status === "Ожидает" && (
            <Link
              href={`/documents/${document.id}/sign`}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Подписать
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}