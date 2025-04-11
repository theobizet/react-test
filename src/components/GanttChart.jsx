import React, { useEffect, useRef, useState } from "react";
import Gantt from "frappe-gantt";

const updateTaskOnServer = async (taskId, data) => {
  try {
    const res = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Erreur lors de la mise à jour du serveur");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
};

const GanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);
  const ganttInstance = useRef(null);
  const [viewMode, setViewMode] = useState("Day");

  useEffect(() => {
    if (!ganttRef.current) return;

    // Nettoyage DOM
    ganttRef.current.innerHTML = "";

    // Création du Gantt
    ganttInstance.current = new Gantt(ganttRef.current, tasks, {
      view_mode: viewMode,
      date_format: "DD-MM-YYYY",
      custom_popup_html: (task) => `
        <div class="p-2 text-sm overflow-clip z-auto">
          <h5 class="font-semibold text-gray-800">${task.name}</h5>
          <p><strong>Début:</strong> ${task.start}</p>
          <p><strong>Fin:</strong> ${task.end}</p>
          <p><strong>Progression:</strong> ${task.progress}%</p>
        </div>
      `,
      on_click: (task) => {
        console.log("Tâche cliquée :", task);
      },
      on_date_change: (task, start, end) => {
        updateTaskOnServer(task.id, { start, end });
      },
      on_progress_change: (task, progress) => {
        updateTaskOnServer(task.id, { progress });
      },
      on_view_change: (mode) => {
        console.log("Vue changée :", mode);
      },
    });
  }, [tasks, viewMode]);

  return (
    <div>
      <div className="flex justify-between items-center mb-3 px-3">
        <h2 className="text-2xl font-semibold text-gray-800">Diagramme de Gantt</h2>
        <div className="flex items-center space-x-2">
          <label className="font-medium text-sm text-gray-700">Vue :</label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="border border-gray-300 text-sm rounded px-2 py-1 bg-white"
          >
            <option value="Day">Jour</option>
            <option value="Week">Semaine</option>
            <option value="Month">Mois</option>
            <option value="Year">Année</option>
          </select>
        </div>
      </div>

      <div
        ref={ganttRef}
        className="w-full overflow-auto rounded-lg shadow-lg bg-white border-2 border-gray-200"
        aria-label="Diagramme de Gantt"
      />
    </div>
  );
};

export default GanttChart;
