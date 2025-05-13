import { IEquipment } from "../models/IEquipment";




export async function AddEquipment(equipment: IEquipment) {
    
    return false
}


export async function EditEquipment(equipment:IEquipment) {

    return false
}

export async function DeleteEquipment(id: number) {

    return false
}


export const EQUIPMENT_LIST = [
    {
        id: 1,
        image: '/plug_img.png',
        title: 'Компьютер',
        details: [
          { label: 'Тип оборудования', value: 'Электроника' },
          { label: 'Серийный номер', value: 'шт' },
          { label: '', value: 'Центральный' },
          { label: 'Статус', value: 'Включен' },
          { label: 'Поставщик', value: ''}
        ],
        type: "оборудование"
    },

    {
        id: 2,
        image: '/plug_img.png',
        title: 'Приколы',
        details: [
          { label: 'Категория', value: 'Электроника' },
          { label: 'Вид измерения', value: 'шт' },
          { label: 'Склад', value: 'Центральный' },
          { label: 'Статус', value: 'В наличии' },
          { label: 'Поставщик', value: ''}
        ],

        type: "оборудование"
    },

    {
      id: 3,
      image: '/plug_img.png',
      title: 'Ням',
      details: [
        { label: 'Категория', value: 'Электроника' },
        { label: 'Вид измерения', value: 'шт' },
        { label: 'Склад', value: 'Центральный' },
        { label: 'Статус', value: 'В наличии' },
        { label: 'Поставщик', value: ''}
      ],
      type: "оборудование"
  },
  {
    id: 4,
    image: '/plug_img.png',
    title: 'Шурупы 10х10',
    details: [
      { label: 'Категория', value: 'Электроника' },
      { label: 'Вид измерения', value: 'шт' },
      { label: 'Склад', value: 'Центральный' },
      { label: 'Статус', value: 'В наличии' },
      { label: 'Поставщик', value: ''}
    ],
      type: "оборудование"
},
]