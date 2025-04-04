import React, { useState } from 'react';
import Task from './Task';
import Header from './Header';
import TaskModal from './TaskModal';

const GanttChart = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = [
    { id: 1, name: 'Task 1', start: new Date(2023, 9, 1), end: new Date(2023, 9, 5), description: 'Description for Task 1' },
    { id: 2, name: 'Task 2', start: new Date(2023, 9, 6), end: new Date(2023, 9, 10), description: 'Description for Task 2' },
  ];

  return (
    <div>
      <Header daysInMonth={30} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} onClick={() => setSelectedTask(task)} />
      ))}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default GanttChart;