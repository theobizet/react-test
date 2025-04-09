import React from "react";

const TaskList = ({ tasks, editTask, deleteTask }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Liste des tâches</h2>
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between border border-gray-200 hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col p-2 text-sm text-gray-700">
            <span className="font-semibold text-base text-gray-900">{task.name}</span>
            <span className="text-xs text-gray-500 mt-1">
              {task.start} → {task.end}
            </span>
            <div className="w-full mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 mt-1">{task.progress}% complété</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => editTask(task)}
              className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium rounded-xl transition"
              aria-label={`Modifier ${task.name}`}
            >
              Modifier
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition"
              aria-label={`Supprimer ${task.name}`}
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;
