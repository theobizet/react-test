import React, { useEffect } from "react";
import Gantt from "frappe-gantt";

const GanttChart = ({ tasks, viewMode }) => {
  useEffect(() => {
    // Initialize the Gantt chart
    const ganttContainer = document.getElementById("gantt-container");
    if (ganttContainer) {
      ganttContainer.innerHTML = ""; // Clear previous chart
      new Gantt(ganttContainer, tasks, {
        view_mode: viewMode,
        date_format: "YYYY-MM-DD",
        custom_popup_html: null,
      });
    }
  }, [tasks, viewMode]);

  return <div id="gantt-container" className="overflow-auto border rounded mt-4" aria-label="Diagramme de Gantt" />;
};

export default GanttChart;
