import { useState } from "react";
import style from "./App.module.scss";
import AlartsPanel from "./Components/Pages/AlartsPanel";
import IncidentsPanel from "./Components/Pages/IncidentsPanel";
import OverviewPanel from "./Components/Pages/OverviewPanel";
import TasksPanel from "./Components/Pages/TasksPanel";

import Header from "./Components/Structure/Header";
import Sidebar from "./Components/Structure/Sidebar";

function App() {
  const [activeView, setActiveView] = useState("tasks");

  return (
    <div className={style.App}>
      <Header />
      <div className={style.appShell}>
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
