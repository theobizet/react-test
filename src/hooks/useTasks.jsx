import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // 🔄 Chargement initial depuis l'API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Erreur chargement des tâches :", err));
  }, []);

  // ➕ Ajouter une tâche
  const addTask = async (form, setError, resetForm) => {
    if (!form.name || !form.start || !form.end) {
      return setError("Veuillez remplir tous les champs obligatoires.");
    }

    const newTask = {
      id: `Task ${Date.now()}`,
      ...form,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error();

      const created = await res.json();
      setTasks((prev) => [...prev, created]);
      resetForm();
    } catch (error) {
      setError("Erreur lors de l'ajout de la tâche.");
    }
  };

  // ✏️ Modifier une tâche
  const updateTask = async (form, setError, taskId, resetForm) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updated.task : t))
      );
      resetForm();
    } catch (error) {
      setError("Erreur lors de la mise à jour de la tâche.");
    }
  };

  // ❌ Supprimer une tâche
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Erreur lors de la suppression.");
    }
  };

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTasks;
