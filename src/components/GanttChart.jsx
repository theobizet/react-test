import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

const GanttChart = ({ tasks, viewMode }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (ganttRef.current) {
      ganttRef.current.innerHTML = "";

      new Gantt(ganttRef.current, tasks, {
        view_mode: viewMode,
        date_format: "YYYY-MM-DD",
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-3 ml-3">Diagramme de Gantt</h2>
      <div
        ref={ganttRef}
        className="w-full overflow-auto rounded-lg shadow-lg bg-white"
        aria-label="Diagramme de Gantt"
      />
    </div>
  );
};

export default GanttChart;
