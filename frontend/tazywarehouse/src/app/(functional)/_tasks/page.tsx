"use client"

import { TaskList } from "@/components/TaskList";
import { PlusIcon, EllipsisVerticalIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Тип для задачи
type Task = {
  id: string;
  label: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate?: Date;
  assignedTo?: string;
};

// Пример данных задач
const initialTasks: Task[] = [
  {
    id: '1',
    label: 'Провести инвентаризацию склада №2',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 86400000), // Завтра
    assignedTo: 'Иванов И.'
  },
  {
    id: '2',
    label: 'Подписать акт приема-передачи оборудования',
    priority: 'medium',
    status: 'not-started',
    dueDate: new Date(Date.now() + 259200000), // 3 дня
  },
  {
    id: '3',
    label: 'Обновить реестр оргтехники',
    priority: 'low',
    status: 'completed',
    dueDate: new Date(Date.now() - 86400000), // Вчера
    assignedTo: 'Петрова С.'
  }
];

// Иконки для приоритетов
const priorityIcons = {
  high: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
  medium: <ClockIcon className="h-5 w-5 text-yellow-500" />,
  low: <CheckCircleIcon className="h-5 w-5 text-green-500" />
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  // Форматирование даты
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Добавление новой задачи
  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        label: newTaskText,
        priority: 'medium',
        status: 'not-started',
        dueDate: new Date(Date.now() + 86400000) // По умолчанию срок - завтра
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  // Изменение статуса задачи
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'not-started' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <span className="w-2 h-6 bg-blue-500 mr-2 rounded-full"></span>
          Мои задачи
        </h2>
        <button className="text-gray-500 hover:text-gray-700">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Форма добавления новой задачи */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Добавить новую задачу..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 flex items-center"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Список задач */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Нет задач</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 border rounded-lg flex items-start hover:shadow-md transition-shadow ${
                task.status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`mt-1 mr-3 flex-shrink-0 ${
                  task.status === 'completed' ? 'text-green-500' : 'text-gray-300'
                }`}
              >
                <CheckCircleIcon className="h-5 w-5" />
              </button>

              <div className="flex-1">
                <div className="flex justify-between">
                  <p className={`font-medium ${
                    task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task.label}
                  </p>
                  <div className="flex items-center">
                    {priorityIcons[task.priority]}
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 gap-2">
                  {task.dueDate && (
                    <span className={`px-2 py-1 rounded ${
                      task.status === 'completed' ? 'bg-gray-100' : 
                      task.dueDate.getTime() < Date.now() ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                  {task.assignedTo && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {task.assignedTo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Фильтры и статистика */}
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>
          {tasks.filter(t => t.status === 'completed').length} из {tasks.length} завершено
        </span>
        <div className="space-x-2">
          <button className="hover:text-blue-600">Все</button>
          <button className="hover:text-blue-600">Активные</button>
          <button className="hover:text-blue-600">Завершенные</button>
        </div>
      </div>
    </div>
  );
}