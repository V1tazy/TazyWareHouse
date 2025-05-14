"use client"



import { StringArraySelect } from "@/components/SelectBar"
import { useRouter } from "next/navigation"


const STATUS_LIST = ['Выберите статус']

const CATEGORY_LIST = ['Категория']

const SUPLIER_LIST = ['Поставщики']

const WAREHOUSE_LIST = ['Склады']

const MEASUREMENT_LIST = ['шт']


export default function ProductAddPage() {


    const handleAddButton = () => {
        alert('Товар успешно сохранен')

        route.push('/product')
    }

    const route = useRouter()
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Добавление нового товара</h1>
            
            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Наименование товара</label>
                    <input 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5138DF]"
                        placeholder="Введите наименование товара"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Категория</label>
                        <StringArraySelect options={CATEGORY_LIST} />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Поставщик</label>
                        <StringArraySelect options={SUPLIER_LIST} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Количество</label>
                        <input 
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5138DF]"
                            placeholder="Введите кол-во товара"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Единица измерения</label>
                        <StringArraySelect options={MEASUREMENT_LIST} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Склад</label>
                    <StringArraySelect options={WAREHOUSE_LIST} />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button 
                        type="button"
                        className="px-4 py-2 border border-[#5138DF] text-[#5138DF] rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => route.push("/product")}
                    >
                        Отменить
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-[#5138DF] text-white rounded-md hover:bg-[#3d2bb3] transition-colors"
                        onClick={handleAddButton}
                    >
                        Создать товар
                    </button>
                </div>
            </form>
        </div>
    )
}