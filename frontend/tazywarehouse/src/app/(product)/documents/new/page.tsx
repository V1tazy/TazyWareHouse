// /pages/documents/new.tsx
"use client";
import { useRouter } from "next/navigation";
import { useDocument } from "@/hooks/useDocument";
import { DocumentForm } from "@/components/DocumentForm/Component";

export default function NewDocumentPage() {
  const router = useRouter();
  const { templates, createDocument } = useDocument();

  const handleSubmit = (data: Omit<Document, "id" | "createdAt">) => {
    createDocument(data);
    router.push("/documents");
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Создать документ</h1>
      <DocumentForm templates={templates} onSubmit={handleSubmit} />
    </div>
  );
}