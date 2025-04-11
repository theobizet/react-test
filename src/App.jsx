import React, { useState, useEffect } from "react";
import GanttChart from "./components/GanttChart";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

const App = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen) setError("");
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

      <div className="container flex mx-auto items-start space-x-4">
        <TaskList
          tasks={tasks}
          editTask={editTask}
          deleteTask={deleteTask}
          className="w-2/5 h-full flex flex-col grow"
        />

        <div className="w-3/5 flex flex-col grow space-y-2 overflow-y-clip">
          <GanttChart tasks={tasks} className="overflow-y-clip" />
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
  );
};

export default App;
