"use client"

import { CATEGORY_LIST } from "@/@libs/data/category"
import { MEASUREMENT_LIST } from "@/@libs/data/measurement"
import { getProductById } from "@/@libs/data/products"
import { SUPLIER_LIST } from "@/@libs/data/suplier"
import { WAREHOUSE_LIST } from "@/@libs/data/warehouse"
import  { IProduct } from "@/@libs/models/IProduct"

import { StringArraySelect } from "@/components/SelectBar"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { title } from "process"
import { useEffect, useState } from "react"

export default function ProductEditPage() {

    const params = useParams();
    const router = useRouter();

    const [product, setProduct] = useState<IProduct | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        supplier: '',
        quantity: 0,
        measurement: '',
        warehouse: ''
    });


    useEffect(() => {
        if (params?.id) {
        const productId = Number(params.id);
        const foundProduct = getProductById(productId);
        
        if (foundProduct) {
            setProduct(foundProduct);т
            setFormData({
            title: foundProduct.title,
            category: foundProduct.details.find(d => d.label === 'Категория')?.value || '',
            supplier: foundProduct.details.find(d => d.label === 'Склад')?.value || '',
            quantity: 0,
            measurement: foundProduct.details.find(d => d.label === 'Вид измерения')?.value || '',
            warehouse: foundProduct.details.find(d => d.label === 'Склад')?.value || ''
            });
        }
        }
    }, [params?.id]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь логика сохранения изменений
        console.log('Form submitted:', formData);
        // После сохранения можно сделать redirect
        router.push('/product');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Редактирование товара #{product.id}</h1>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Наименование товара</label>
          <input 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5138DF]"
            placeholder="Введите наименование товара"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Категория</label>
            <StringArraySelect 
              options={CATEGORY_LIST} 
              value={formData.category}
              onChange={(value) => handleSelectChange('category', value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Поставщик</label>
            <StringArraySelect 
              options={SUPLIER_LIST} 
              value={formData.supplier}
              onChange={(value) => handleSelectChange('supplier', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Количество</label>
            <input 
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5138DF]"
              placeholder="Введите кол-во товара"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Единица измерения</label>
            <StringArraySelect 
              options={MEASUREMENT_LIST} 
              value={formData.measurement}
              onChange={(value) => handleSelectChange('measurement', value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Склад</label>
          <StringArraySelect 
            options={WAREHOUSE_LIST} 
            value={formData.warehouse}
            onChange={(value) => handleSelectChange('warehouse', value)}
          />
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