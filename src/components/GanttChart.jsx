import React, { useEffect } from "react";
import Gantt from "frappe-gantt";

const GanttChart = ({ tasks, viewMode }) => {
  useEffect(() => {
    const ganttContainer = document.getElementById("gantt-container");
    if (ganttContainer) {
      ganttContainer.innerHTML = "";
      new Gantt(ganttContainer, tasks, {
        view_mode: viewMode,
        date_format: "YYYY-MM-DD",
        custom_popup_html: null,
        header_height: 50,
        bar_height: 25,
        bar_corner_radius: 4,
        padding: 20,
        step: 24,
      });
    }
  }, [tasks, viewMode]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Diagramme de Gantt</h2>
      <div
        id="gantt-container"
        className="w-full overflow-auto border border-gray-200 rounded-2xl shadow-md bg-white"
        aria-label="Diagramme de Gantt"
      />
    </div>
  );
};

export default GanttChart;
