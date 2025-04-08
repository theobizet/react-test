import React, { useState, useEffect, useRef, useCallback } from "react";
import GanttChart from "./components/GanttChart";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { validateForm } from "./components/utils";

const initialTasks = [
  {
    id: "Task 1",
    name: "Initial task",
    start: "2025-04-08",
    end: "2025-04-12",
    progress: 20,
    dependencies: "",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "Day";
  });
  const [form, setForm] = useState({
    name: "",
    start: "",
    end: "",
    progress: 0,
    dependencies: "",
  });
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  const addTask = () => {
    if (!validateForm(form, tasks, setError)) return;
    const id = `Task ${Date.now()}`;
    const newTask = { ...form, id, progress: parseInt(form.progress, 10) };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  const editTask = (task) => {
    setForm(task);
    setEditingTaskId(task.id);
  };

  const updateTask = () => {
    if (!validateForm(form, tasks, setError)) return;
    const updated = tasks.map((t) =>
      t.id === editingTaskId ? { ...form, id: editingTaskId, progress: parseInt(form.progress, 10) } : t
    );
    setTasks(updated);
    resetForm();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editingTaskId === id) resetForm();
  };

  const resetForm = () => {
    setForm({ name: "", start: "", end: "", progress: 0, dependencies: "" });
    setEditingTaskId(null);
    setError("");
  };

  const handleViewChange = (e) => {
    const mode = e.target.value;
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row space-y-4 space-x-4 items-center">
        <div className="w-1/3">
          <h2 className="text-xl font-bold">Liste des tâches</h2>
          <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex justify-start items-center">
            <label className="mr-2 font-semibold">Vue:</label>
            <select
              value={viewMode}
              onChange={handleViewChange}
              className="border p-2 rounded"
              aria-label="Mode de vue"
            >
              <option value="Day">Jour</option>
              <option value="Week">Semaine</option>
              <option value="Month">Mois</option>
            </select>
          </div>
          <GanttChart tasks={tasks} viewMode={viewMode} />
        </div>
      </div>
      <hr className="my-4"/>
      <div className="w-full">
        <TaskForm
          form={form}
          handleChange={handleChange}
          addTask={addTask}
          updateTask={updateTask}
          editingTaskId={editingTaskId}
          resetForm={resetForm}
          error={error}
        />
      </div>
    </div>
  );
}
