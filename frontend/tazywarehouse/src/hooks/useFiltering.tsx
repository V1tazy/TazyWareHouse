import { useState } from "react";

interface UseFilteringProps<T> {
  data: T[];
  initialSearchTerm?: string;
  initialTypeFilter?: string;
  initialStatusFilter?: string;
  searchFields?: (keyof T)[];
  itemsPerPage?: number;
}

export function useFiltering<T>({
  data,
  initialSearchTerm = "",
  initialTypeFilter = "Все",
  initialStatusFilter = "Все",
  searchFields = [],
  itemsPerPage = 5,
}: UseFilteringProps<T>) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [typeFilter, setTypeFilter] = useState(initialTypeFilter);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) => {
    // Поиск по указанным полям
    const matchesSearch = searchFields.some((field) => {
      const fieldValue = String(item[field]).toLowerCase();
      return fieldValue.includes(searchTerm.toLowerCase());
    });

    // Фильтрация по типу (если есть поле type)
    const matchesType =
      typeFilter === "Все" ||
      !("type" in item) ||
      (item as any).type === typeFilter;

    // Фильтрация по статусу (если есть поле status)
    const matchesStatus =
      statusFilter === "Все" ||
      !("status" in item) ||
      (item as any).status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    filteredData,
    paginatedData,
    totalPages,
    handlePageChange,
    itemsPerPage,
  };
}