"use client"


import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

type FiltersProps = {
    searchTerm: string

    setSearchTerm: Dispatch<SetStateAction<string>>

    statusFilter: string

    setStatusFilter: Dispatch<SetStateAction<string>>

    typeFilter?: string

    setTypeFilter? : Dispatch<SetStateAction<string>>

    searchPlaceholder: string

    showTypeFilter?: boolean

    statusOptions: {value: string; label: string}[]

    typeOptions?: {value: string; label: string}[]
}

export function Filters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  searchPlaceholder,
  showTypeFilter = false,
  statusOptions,
  typeOptions = [],
}: FiltersProps) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-2 h-6 bg-blue-500 mr-2 rounded-full"></span>
        Фильтры
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Поле поиска */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Фильтр по типу (если нужен) */}
        {showTypeFilter && setTypeFilter && (
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Фильтр по статусу */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}