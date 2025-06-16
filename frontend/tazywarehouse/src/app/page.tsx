
import { getServerSession } from "next-auth";
import ActivitiesPage from "./(functional)/_activies/page";
import TaskPage from "./(functional)/_tasks/page";
import StatsPage from "./(functional)/_stats/page";

export default async function Home() {

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      {/* Заголовок с приветствием */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Добро пожаловать!</h1>
        <p className="text-gray-600">Ваша рабочая панель на {new Date().toLocaleDateString('ru-RU')}</p>
      </header>
      
      {/* Основная сетка доски */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Левая колонка (задачи и активность) */}
        <div className="space-y-6">
          {/* Блок задач */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-2 h-6 bg-blue-500 mr-2 rounded-full"></span>
              Мои задачи
            </h2>
            <TaskPage />
          </section>
          
          {/* Блок активности */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 mr-2 rounded-full"></span>
              Последняя активность
            </h2>
            <ActivitiesPage />
          </section>
        </div>
        
        {/* Правая колонка (статистика) - занимает 2/3 ширины */}
        <div className="lg:col-span-2">
          <section className="bg-white rounded-lg shadow p-6 h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-2 h-6 bg-purple-500 mr-2 rounded-full"></span>
              Статистика и аналитика
            </h2>
            <StatsPage />
          </section>
        </div>
      </div>
    </div>
  );
}