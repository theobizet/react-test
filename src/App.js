import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GanttChart from './components/GanttChart';

const App = () => (
  <div className="App">
    <header className="bg-primary text-white text-center py-3">
      <h1>Diagramme de Gantt</h1>
    </header>
    <main className="container mt-5">
      <GanttChart />
    </main>
  </div>
);

export default App;