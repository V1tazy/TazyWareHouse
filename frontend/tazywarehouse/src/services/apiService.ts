export interface WarehouseData {
  total: {
    name: string;
    totalItems: number;
    turnoverRate: number;
    categories: { name: string; value: number }[];
    monthlyData: { month: string; received: number; shipped: number }[];
    equipmentStatus: { type: string; count: number }[];
  };
  warehouses: {
    id: number;
    name: string;
    totalItems: number;
    turnoverRate: number;
    categories: { name: string; value: number }[];
    monthlyData: { month: string; received: number; shipped: number }[];
    equipmentStatus: { type: string; count: number }[];
  }[];
}

export async function fetchWarehouseData(): Promise<WarehouseData> {
  const response = await fetch('http://localhost:5149/api/Stats/warehouses');
  if (!response.ok) {
    throw new Error('Failed to fetch warehouse data');
  }
  const data = await response.json();
  console.log(data);
  return data;
}