"use client"

import { PlusIcon, EllipsisVerticalIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  label: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate?: string; // Сохраняем как строку для localStorage
  assignedTo?: string;
};

const TASKS_KEY = "tazywarehouse_tasks";

function getTasksFromStorage(): Task[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TASKS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function saveTasksToStorage(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

const priorityIcons = {
  high: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
  medium: <ClockIcon className="h-5 w-5 text-yellow-500" />,
  low: <CheckCircleIcon className="h-5 w-5 text-green-500" />
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    setTasks(getTasksFromStorage());
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        label: newTaskText,
        priority: 'medium',
        status: 'not-started',
        dueDate: new Date(Date.now() + 86400000).toISOString()
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'not-started' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  function getEquipmentStats() {
    const equipment = JSON.parse(localStorage.getItem("tazywarehouse_equipment") || "[]");
    const offices = JSON.parse(localStorage.getItem("tazywarehouse_offices") || "[]");

    // Пример: общее количество, распределение по офисам, статусам и т.д.
    const totalItems = equipment.length;
    const byOffice = offices.map((office: any) => ({
      name: office.name,
      count: equipment.filter((e: any) => e.office === office.name).length
    }));
    const byStatus = ["В использовании", "На складе", "В ремонте", "Списано"].map(status => ({
      status,
      count: equipment.filter((e: any) => e.status === status).length
    }));

    return { totalItems, byOffice, byStatus };
  }

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
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
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
                      new Date(task.dueDate).getTime() < Date.now() ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
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