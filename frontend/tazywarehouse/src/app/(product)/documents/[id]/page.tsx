// /pages/documents/[id]/index.tsx
"use client";
import { useRouter, useParams } from "next/navigation";
import { useDocument } from "@/hooks/useDocument";
import Link from "next/link";
import { DocumentActions } from "@/components/DocumentActions/Component";

export default function DocumentDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { getDocument, approveDocument } = useDocument();
  const document = getDocument(Number(id));

  if (!document) {
    return <div className="min-h-screen p-4 max-w-7xl mx-auto">Документ не найден</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const blob = new Blob([document.content || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${document.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{document.name}</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Детали документа</h2>
          <p><strong>Тип:</strong> {document.type}</p>
          <p><strong>Статус:</strong> {document.status}</p>
          <p><strong>Ответственный:</strong> {document.responsible}</p>
          <p><strong>Дата создания:</strong> {document.createdAt}</p>
          <p><strong>Подписи:</strong> {document.signatures?.join(", ") || "Нет"}</p>
          <p><strong>Утверждения:</strong> {document.approvers?.join(", ") || "Нет"}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Содержимое</h2>
          <div
            className="p-4 border rounded-md bg-gray-50"
            dangerouslySetInnerHTML={{ __html: document.content || "Нет содержимого" }}
          />
        </div>
        <DocumentActions
          document={document}
          onApprove={(approver) => approveDocument(document.id, approver)}
          onPrint={handlePrint}
          onExport={handleExport}
        />
        <div className="flex space-x-4">
          {document.status === "Черновик" && (
            <Link
              href={`/documents/${document.id}/edit`}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Редактировать
            </Link>
          )}
          {document.status === "Ожидает" && (
            <Link
              href={`/documents/${document.id}/sign`}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Подписать
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}