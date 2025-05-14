// /types/document.ts
export interface Document {
  id: number;
  name: string;
  type: "Счет" | "Акт" | "Инвентаризация" | "Гарантия";
  status: "Черновик" | "Ожидает" | "Утвержден" | "Подписан";
  createdAt: string;
  responsible: string;
  content?: string; // Document content (e.g., JSON or HTML for templates)
  signatures?: string[]; // List of electronic signatures
  approvers?: string[]; // List of users who approved
}

export interface Template {
  id: number;
  name: string;
  type: "Счет" | "Акт" | "Инвентаризация" | "Гарантия";
  content: string; // Template content (e.g., JSON or HTML)
}