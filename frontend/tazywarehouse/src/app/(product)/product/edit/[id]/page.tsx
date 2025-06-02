"use client"

import { StringArraySelect } from "@/components/SelectBar"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    id: "",
    name: "",
    categoryId: "",
    supplierId: "",
    meansureId: ""
  });

  useEffect(() => {
    if (params?.id) {
      fetch(`http://localhost:5149/api/Product/${params.id}`)
        .then(res => res.json())
        .then(data => setForm({
          id: data.id,
          name: data.name,
          categoryId: data.categoryId || "",
          supplierId: data.supplierId || "",
          meansureId: data.meansureId || ""
        }));
    }
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:5149/api/Product/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/product");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Редактирование товара</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Наименование товара</label>
          <input
            name="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5138DF]"
            placeholder="Введите наименование товара"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Категория</label>
            <StringArraySelect
              value={form.categoryId}
              onChange={val => setForm({ ...form, categoryId: val })}
              options={[]} // Подгрузите список категорий с API
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Поставщик</label>
            <StringArraySelect
              value={form.supplierId}
              onChange={val => setForm({ ...form, supplierId: val })}
              options={[]} // Подгрузите список поставщиков с API
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Единица измерения</label>
            <StringArraySelect
              value={form.meansureId}
              onChange={val => setForm({ ...form, meansureId: val })}
              options={[]} // Подгрузите список единиц измерения с API
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/product')}
            className="px-4 py-2 border border-[#5138DF] text-[#5138DF] rounded-md hover:bg-gray-50 transition-colors"
          >
            Отменить
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#5138DF] text-white rounded-md hover:bg-[#3d2bb3] transition-colors"
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}