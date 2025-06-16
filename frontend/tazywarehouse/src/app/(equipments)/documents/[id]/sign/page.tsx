// /pages/documents/[id]/sign.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDocument } from "@/hooks/useDocument";

export default function SignDocumentPage() {
  const router = useRouter();
  const { id } = useParams();
  const { getDocument, signDocument } = useDocument();
  const [document, setDocument] = useState<any>(null);
  const [signature, setSignature] = useState("");

  useEffect(() => {
    if (id) {
      getDocument(id as string).then(setDocument);
    }
  }, [id]);

  if (!document) {
    return <div className="min-h-screen p-4 max-w-7xl mx-auto">Документ не найден</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signature) {
      await signDocument(document.id, signature);
      router.push(`/documents/${document.id}`);
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Подписать документ: {document.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Электронная подпись</label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Введите подпись (например, ваше имя)"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Подписать
        </button>
      </form>
    </div>
  );
}