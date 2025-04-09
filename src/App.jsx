import React, { useState, useEffect } from "react";
import GanttChart from "./components/GanttChart";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { validateForm, checkForOverlaps } from "./components/utils";

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
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (isOpen) {
      setError(""); // Clear any previous errors when the form opens
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingTaskId) {
      updateTask();
    } else {
      addTask();
    }
  };

  const addTask = () => {
    if (!validateForm(form, tasks, setError)) return;
    const id = `Task ${Date.now()}`;
    const newTask = { ...form, id, progress: parseInt(form.progress, 10) };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    resetForm();
  };

  const editTask = (task) => {
    setForm(task);
    setEditingTaskId(task.id);
    setIsOpen(true);
  };

  const updateTask = () => {
    if (!validateForm(form, tasks, setError)) return;

    // Check for overlaps with other tasks
    const otherTasks = tasks.filter((t) => t.id !== editingTaskId);
    if (checkForOverlaps(form, otherTasks)) {
      setError("La nouvelle tâche chevauche une tâche existante.");
      return;
    }

    const updated = tasks.map((t) =>
      t.id === editingTaskId ? { ...form, id: editingTaskId, progress: parseInt(form.progress, 10) } : t
    );
    setTasks(updated);
    resetForm();
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    if (editingTaskId === id) resetForm();
  };

  const resetForm = () => {
    setForm({ name: "", start: "", end: "", progress: 0, dependencies: "" });
    setEditingTaskId(null);
    setError("");
    setIsOpen(false);
  };

  const handleViewChange = (e) => {
    const mode = e.target.value;
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  return (
    <div>
      <nav className="navbar bg-gray-800 text-white py-4 mb-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Projet Gantt</h1>
          <div className="navbar-nav space-x-4">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ajouter une tâche
            </button>
          </div>
        </div>
      </nav>
      <div className="p-4">
        <div className="container flex mx-auto items-start space-x-4">
          <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} className="w-2/5 h-full flex flex-col grow"/>
          <div className="w-3/5 flex flex-col grow space-y-2">
            <GanttChart tasks={tasks} viewMode={viewMode} />
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
          </div>
        </div>

        <TaskForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingTaskId={editingTaskId}
          resetForm={resetForm}
          error={error}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
