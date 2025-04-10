import React, { useState, useEffect } from "react";
import GanttChart from "./components/GanttChart";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

const initialTasks = [
  {
    id: "Task 1",
    name: "Planification",
    start: "2025-04-01",
    end: "2025-04-05",
    progress: 100,
    dependencies: "",
  },
  {
    id: "Task 2",
    name: "Conception UI/UX",
    start: "2025-04-06",
    end: "2025-04-10",
    progress: 80,
    dependencies: "Task 1",
  },
  {
    id: "Task 3",
    name: "Développement Frontend",
    start: "2025-04-11",
    end: "2025-04-18",
    progress: 40,
    dependencies: "Task 2",
  },
  {
    id: "Task 4",
    name: "Développement Backend",
    start: "2025-04-11",
    end: "2025-04-20",
    progress: 20,
    dependencies: "Task 2",
  },
  {
    id: "Task 5",
    name: "Intégration",
    start: "2025-04-21",
    end: "2025-04-25",
    progress: 0,
    dependencies: "Task 3,Task 4",
  },
  {
    id: "Task 6",
    name: "Tests",
    start: "2025-04-26",
    end: "2025-04-29",
    progress: 0,
    dependencies: "Task 5",
  },
  {
    id: "Task 7",
    name: "Déploiement",
    start: "2025-04-30",
    end: "2025-05-01",
    progress: 0,
    dependencies: "Task 6",
  },
];


export default function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks(initialTasks);
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
      setError("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingTaskId) {
      updateTask(form, setError, editingTaskId, resetForm);
    } else {
      addTask(form, setError, resetForm);
    }
  };

  const editTask = (task) => {
    setForm(task);
    setEditingTaskId(task.id);
    setIsOpen(true);
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
      <div>
        <div className="container flex mx-auto items-start space-x-4">
          <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} className="w-2/5 h-full flex flex-col grow overflow-scroll"/>
          <div className="w-3/5 flex flex-col grow space-y-2">
            <GanttChart tasks={tasks} viewMode={viewMode} />
            <div className="flex justify-start items-center">
              <label className="mr-2 font-semibold">Vue:</label>
              <select
                value={viewMode}
                onChange={handleViewChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                aria-label="Mode de vue"
              >
                <option value="Day">Jour</option>
                <option value="Week">Semaine</option>
                <option value="Month">Mois</option>
                <option value="Year">Année</option>
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
