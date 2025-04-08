import React from "react";

const TaskForm = ({ form, handleChange, addTask, updateTask, editingTaskId, resetForm, error }) => (
  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      name="name"
      placeholder="Nom de la tâche"
      value={form.name}
      onChange={handleChange}
      className="border p-2 rounded"
      aria-label="Nom de la tâche"
    />
    <input
      type="text"
      name="dependencies"
      placeholder="Dépendances (ex: Task 1)"
      value={form.dependencies}
      onChange={handleChange}
      className="border p-2 rounded"
      aria-label="Dépendances"
    />
    <input
      type="date"
      name="start"
      value={form.start}
      onChange={handleChange}
      className="border p-2 rounded"
      aria-label="Date de début"
    />
    <input
      type="date"
      name="end"
      value={form.end}
      onChange={handleChange}
      className="border p-2 rounded"
      aria-label="Date de fin"
    />
    <input
      type="number"
      name="progress"
      min="0"
      max="100"
      value={form.progress}
      onChange={handleChange}
      className="border p-2 rounded"
      aria-label="Progrès"
    />
    <div className="space-x-2">
      <button
        onClick={editingTaskId ? updateTask : addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        aria-label={editingTaskId ? "Mettre à jour la tâche" : "Ajouter une tâche"}
      >
        {editingTaskId ? "Mettre à jour" : "Ajouter une tâche"}
      </button>
      {editingTaskId && (
        <button
          onClick={resetForm}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          aria-label="Annuler"
        >
          Annuler
        </button>
      )}
    </div>
    {error && <div className="text-red-600 font-semibold">{error}</div>}
  </div>
);

export default TaskForm;
