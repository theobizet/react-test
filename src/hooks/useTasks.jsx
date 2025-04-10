import { useState } from "react";
import { validateForm, checkForOverlaps } from "../utils/utils";

const useTasks = (initialTasks) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (form, setError, resetForm) => {
    if (!validateForm(form, tasks, setError)) return;

    const id = `Task ${Date.now()}`;
    const newTask = { ...form, id, progress: parseInt(form.progress, 10) };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    resetForm();
  };

  const updateTask = (form, setError, editingTaskId, resetForm) => {
    if (!validateForm(form, tasks, setError)) return;

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
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTasks;
