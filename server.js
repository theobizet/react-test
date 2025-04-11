const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Simulation d'une "base" en mémoire
let tasks = [
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
  // ajoutez les autres tâches ici
];

// GET toutes les tâches
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// PUT mise à jour partielle d'une tâche
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }

  tasks[index] = { ...tasks[index], ...updated };

  res.json({ message: "Tâche mise à jour", task: tasks[index] });
});

// POST ajouter une tâche
app.post("/tasks", (req, res) => {
    const task = req.body;
    if (!task.id || !task.name || !task.start || !task.end) {
        return res.status(400).json({ message: "Champs requis manquants." });
    }

    tasks.push(task);
    res.status(201).json(task);
});

// DELETE une tâche
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Tâche non trouvée." });
    }

    tasks.splice(index, 1);
    res.json({ message: "Tâche supprimée" });
});  

// Démarrage
app.listen(port, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${port}`);
});
