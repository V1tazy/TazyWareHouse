



export function getProductById(id: number){
  return PRODUCT_LIST.find(product => product.id === id)
}

export const PRODUCT_LIST = [
    {
        id: 1,
        image: '/plug_img.png',
        title: 'Шурупы 10х10',
        details: [
          { label: 'Категория', value: 'Электроника' },
          { label: 'Вид измерения', value: 'шт' },
          { label: 'Склад', value: 'Центральный' },
          { label: 'Статус', value: 'В наличии' },
          { label: 'Поставщик', value: ''}
        ],
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
},
]