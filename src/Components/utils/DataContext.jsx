// DataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { alertsData, incidentsData, taskData } from "./DataFetch";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    alertsData().then(setAlerts);
    taskData().then(setTasks);
    incidentsData().then(setIncidents);
  }, []);

  return (
    <DataContext.Provider value={{ alerts, tasks, incidents }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
