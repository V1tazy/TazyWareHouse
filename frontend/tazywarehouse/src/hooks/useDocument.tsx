// /hooks/useDocument.ts
import { useState } from "react";
import { Document, Template } from "@/types/document";

export const useDocument = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Счет №001", type: "Счет", status: "Черновик", createdAt: "2025-05-01", responsible: "Иван Петров" },
    { id: 2, name: "Акт №023", type: "Акт", status: "Утвержден", createdAt: "2025-04-28", responsible: "Анна Соколова" },
    { id: 3, name: "Инвентаризация №005", type: "Инвентаризация", status: "Ожидает", createdAt: "2025-05-10", responsible: "Дмитрий Иванов" },
    { id: 4, name: "Гарантия №017", type: "Гарантия", status: "Подписан", createdAt: "2025-05-03", responsible: "Елена Смирнова" },
  ]);

  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: "Шаблон счета", type: "Счет", content: "<h1>Счет</h1><p>Сумма: {amount}</p>" },
    { id: 2, name: "Шаблон акта", type: "Акт", content: "<h1>Акт</h1><p>Услуги: {services}</p>" },
  ]);

  const createDocument = (document: Omit<Document, "id" | "createdAt">) => {
    const newDocument = {
      ...document,
      id: documents.length + 1,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDocuments([...documents, newDocument]);
    return newDocument;
  };

  const updateDocument = (id: number, updated: Partial<Document>) => {
    setDocuments(documents.map((doc) => (doc.id === id ? { ...doc, ...updated } : doc)));
  };

  const signDocument = (id: number, signature: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, signatures: [...(doc.signatures || []), signature], status: "Подписан" }
          : doc
      )
    );
  };

  const approveDocument = (id: number, approver: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, approvers: [...(doc.approvers || []), approver], status: "Утвержден" }
          : doc
      )
    );
  };

  const getDocument = (id: number) => documents.find((doc) => doc.id === id);

  return {
    documents,
    templates,
    createDocument,
    updateDocument,
    signDocument,
    approveDocument,
    getDocument,
  };
};