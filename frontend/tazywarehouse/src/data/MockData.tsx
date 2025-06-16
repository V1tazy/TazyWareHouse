import { User } from "./User";
import { Equipment } from "./Equipment";
import { Document } from "./Document";
import { Activity } from "./Activity";
import { DataSource } from "./DataSource";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Иван Иванов",
    position: "Менеджер",
    email: "ivanov@example.com",
    photo: "/images/ivanov.jpg",
    roles: ["admin"],
    permissions: ["read", "write", "delete"]
  },
  {
    id: 2,
    name: "Мария Петрова",
    position: "Складской работник",
    email: "petrova@example.com",
    photo: "/images/petrova.jpg",
    roles: ["user"],
    permissions: ["read"]
  }
];

// ...existing code...
export const mockEquipment: Equipment[] = [
  {
    id: 1,
    name: "Сканер",
    serial: "SCN-12345",
    assignedDate: "2024-06-01",
    status: "active",
    categoryName: "Сканеры",
    meansureName: "шт.",
    supplierName: "Поставщик А",
    warehouseName: "Склад 1",
    office: "Офис Москва",
    model: "ScanMaster 2000",
    user: "Иван Иванов"
  },
  {
    id: 2,
    name: "Принтер",
    serial: "PRN-67890",
    assignedDate: "2024-05-15",
    status: "maintenance",
    categoryName: "Принтеры",
    meansureName: "шт.",
    supplierName: "Поставщик Б",
    warehouseName: "Склад 2",
    office: "Офис СПб",
    model: "PrintJet X",
    user: "Мария Петрова"
  }
];
// ...existing code...
export const mockDocuments: Document[] = [
  {
    id: 1,
    name: "Накладная №123",
    type: "invoice",
    status: "approved",
    createdAt: "2024-06-10",
    responsible: "Иван Иванов"
  },
  {
    id: 2,
    name: "Акт приема",
    type: "act",
    status: "pending",
    createdAt: "2024-06-12",
    responsible: "Мария Петрова"
  }
];

export const mockActivities: Activity[] = [
  {
    id: 1,
    action: "Добавлен новый документ",
    timestamp: "2024-06-10T12:00:00"
  },
  {
    id: 2,
    action: "Оборудование выдано сотруднику",
    timestamp: "2024-06-11T09:30:00"
  }
];

export const mockDataSources: DataSource[] = [
  {
    id: "source1",
    name: "Склад 1",
    location: "Москва"
  },
  {
    id: "source2",
    name: "Склад 2",
    location: "Санкт-Петербург"
  }
];