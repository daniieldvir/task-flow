import { useState } from "react";
import "./App.css";
import AlartsPanel from "./Components/Pages/AlartsPanel";
import IncidentsPanel from "./Components/Pages/IncidentsPanel";
import OverviewPanel from "./Components/Pages/OverviewPanel";
import TasksPanel from "./Components/Pages/TasksPanel";

import Header from "./Components/Structure/Header";
import Sidebar from "./Components/Structure/Sidebar";

function App() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="app">
      <Header />
      <div className="app-shell">
        <Sidebar onChangeView={setActiveView} />
        {activeView === "overview" && <OverviewPanel />}
        {activeView === "tasks" && <TasksPanel />}
        {activeView === "alerts" && <AlartsPanel />}
        {activeView === "incidents" && <IncidentsPanel />}
      </div>
    </div>
  );
}

export default App;
