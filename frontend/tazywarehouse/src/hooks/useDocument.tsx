import { useState, useEffect } from "react";

export interface Document {
  id?: string;
  name: string;
  documentURL: string;
  status: string;
  description: string;
  tags: string;
  documentTypeId: string;
  userEmail?: string;
  // Добавьте другие поля, если нужно
}

const API_BASE_URL = "http://localhost:5149/api/Document";

export function useDocument() {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Получить все шаблоны
  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates`);
      if (!response.ok) throw new Error("Ошибка при загрузке шаблонов документов.");
      setTemplates(await response.json());
    } catch (err: any) {
      setError(err.message || "Не удалось загрузить шаблоны документов.");
    }
  };

  // Получить документ по id
  const getDocument = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

  // Создать документ
  const createDocument = async (document: Document) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      if (!response.ok) throw new Error("Ошибка при создании документа.");
      return await response.json();
    } catch (err: any) {
      setError(err.message || "Не удалось создать документ.");
      throw err;
    }
  };

  // Обновить документ
  const updateDocument = async (id: string, document: Document) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      if (!response.ok) throw new Error("Ошибка при обновлении документа.");
    } catch (err: any) {
      setError(err.message || "Не удалось обновить документ.");
      throw err;
    }
  };

  // Подписать документ (пример, если есть отдельный endpoint)
  const signDocument = async (id: string, signature: string) => {
    try {
      // Здесь предполагается, что есть endpoint для подписи
      const response = await fetch(`${API_BASE_URL}/${id}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature }),
      });
      if (!response.ok) throw new Error("Ошибка при подписании документа.");
    } catch (err: any) {
      setError(err.message || "Не удалось подписать документ.");
      throw err;
    }
  };

  useEffect(() => { fetchTemplates(); }, []);

  return { templates, createDocument, getDocument, updateDocument, signDocument, error };
}