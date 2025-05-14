import { DataSource } from "@/data/DataSource";



export type ColumnConfig = {
  key: string;
  header: string;
  render?: (value: any, row: DataSource) => React.ReactNode;
  className?: string;
};