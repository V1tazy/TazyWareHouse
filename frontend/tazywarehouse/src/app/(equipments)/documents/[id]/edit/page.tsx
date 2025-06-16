// /pages/documents/[id]/edit.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDocument } from "@/hooks/useDocument";
import { DocumentForm } from "@/components/DocumentForm/Component";

export default function EditDocumentPage() {
  const router = useRouter();
  const { id } = useParams();
  const { getDocument, updateDocument, templates } = useDocument();
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getDocument(id as string).then(setDocument);
    }
  }, [id]);

  if (!document) {
    return <div className="min-h-screen p-4 max-w-7xl mx-auto">Документ не найден</div>;
  }

  const handleSubmit = async (data: any) => {
    await updateDocument(document.id, data);
    router.push(`/documents/${document.id}`);
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Редактировать документ: {document.name}</h1>
      <DocumentForm document={document} templates={templates} onSubmit={handleSubmit} />
    </div>
  );
}