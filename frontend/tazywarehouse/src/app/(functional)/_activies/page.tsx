import { Suspense } from "react";
import { ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// Тип для активности
type Activity = {
  id: string;
  label: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning';
  user?: string;
};

// Пример данных с разными типами активностей
const ACTIVITIES: Activity[] = [
  {
    id: '1',
    label: 'Новая поставка на склад №3',
    timestamp: new Date(Date.now() - 3600000), // 1 час назад
    type: 'info',
    user: 'Иванов И.'
  },
  {
    id: '2',
    label: 'Задача "Инвентаризация" завершена',
    timestamp: new Date(Date.now() - 86400000), // 1 день назад
    type: 'success'
  },
  {
    id: '3',
    label: 'Просрочено списание оборудования',
    timestamp: new Date(Date.now() - 172800000), // 2 дня назад
    type: 'warning'
  },
  {
    id: '4',
    label: 'Перемещение товаров в зону B2',
    timestamp: new Date(Date.now() - 1800000), // 30 минут назад
    type: 'info',
    user: 'Петрова С.'
  }
];

// Иконки для разных типов активностей
const activityIcons = {
  info: <ClockIcon className="h-5 w-5 text-blue-500" />,
  success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
};

export default function ActivitiesPage() {
  // Форматирование даты в относительное время (например, "2 часа назад")
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    const intervals = {
      год: 31536000,
      месяц: 2592000,
      неделя: 604800,
      день: 86400,
      час: 3600,
      минута: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 
          unit === 'месяц' ? 'а' : 
          unit === 'год' ? 'а' : 'а'} назад`;
      }
    }
    
    return 'только что';
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
        История активности
      </h2>
      
      <div className="space-y-4">
        <Suspense fallback={<div>Загрузка активности...</div>}>
          {ACTIVITIES.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {activityIcons[activity.type]}
              </div>
              
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.label}
                </p>
                
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                  {activity.user && (
                    <span className="ml-2 before:content-['·'] before:mr-2">
                      {activity.user}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Suspense>
        
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
          Показать все активности
        </button>
      </div>
    </div>
  );
}