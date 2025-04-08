import React from "react";

const TaskList = ({ tasks, editTask, deleteTask }) => (
  <ul className="space-y-2">
    {tasks.map((task) => (
      <li key={task.id} className="border p-2 rounded flex justify-between items-center">
        <div>
          <strong>{task.name}</strong> – {task.start} → {task.end} – {task.progress}%
        </div>
        <div className="space-x-2">
          <button
            onClick={() => editTask(task)}
            className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
            aria-label={`Modifier ${task.name}`}
          >
            Modifier
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            aria-label={`Supprimer ${task.name}`}
          >
            Supprimer
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default TaskList;
