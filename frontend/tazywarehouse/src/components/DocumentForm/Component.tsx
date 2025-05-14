// /components/DocumentForm/DocumentForm.tsx
import { useState } from "react";
import { Document, Template } from "@/types/document";

interface DocumentFormProps {
  document?: Document;
  templates: Template[];
  onSubmit: (data: Omit<Document, "id" | "createdAt">) => void;
}

export const DocumentForm = ({ document, templates, onSubmit }: DocumentFormProps) => {
  const [formData, setFormData] = useState({
    name: document?.name || "",
    type: document?.type || "Счет",
    responsible: document?.responsible || "",
    content: document?.content || "",
    status: document?.status || "Черновик",
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id === Number(templateId));
    if (template) {
      setFormData((prev) => ({ ...prev, content: template.content, type: template.type }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      signatures: document?.signatures || [],
      approvers: document?.approvers || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Название</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Тип</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Document["type"] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Счет">Счет</option>
          <option value="Акт">Акт</option>
          <option value="Инвентаризация">Инвентаризация</option>
          <option value="Гарантия">Гарантия</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Шаблон</label>
        <select
          value={selectedTemplate}
          onChange={handleTemplateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Выберите шаблон</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ответственный</label>
        <input
          type="text"
          value={formData.responsible}
          onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Содержимое</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={6}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {document ? "Сохранить" : "Создать"}
      </button>
    </form>
  );
};