import React from "react";

const TaskList = ({ tasks, editTask, deleteTask }) => (
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Liste des tâches</h2>
    
    <div style={{ maxHeight: "calc(100vh - 88px - 44px - 16px)", overflowY: "auto" }} className="scrollbar-hide">
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-slate-200 shadow-md rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition duration-300 border-2 border-gray-200"
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
  </div>
);

export default TaskList;
