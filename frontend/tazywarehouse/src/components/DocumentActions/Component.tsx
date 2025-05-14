// /components/DocumentActions/DocumentActions.tsx
import { Document } from "@/types/document";

interface DocumentActionsProps {
  document: Document;
  onApprove: (approver: string) => void;
  onPrint: () => void;
  onExport: () => void;
}

export const DocumentActions = ({ document, onApprove, onPrint, onExport }: DocumentActionsProps) => {
  const handleApprove = () => {
    const approver = prompt("Введите имя утверждающего:");
    if (approver) onApprove(approver);
  };

  return (
    <div className="flex space-x-4">
      {document.status === "Черновик" && (
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Утвердить
        </button>
      )}
      <button
        onClick={onPrint}
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Печать
      </button>
      <button
        onClick={onExport}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Экспорт
      </button>
    </div>
  );
};