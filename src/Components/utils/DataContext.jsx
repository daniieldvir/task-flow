import { createContext, useContext, useEffect, useState } from "react";
import { alertsData, incidentsData, taskData } from "./DataFetch";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    alertsData().then(setAlerts);
    taskData().then(setTasks);
    incidentsData().then(setIncidents);
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{ alerts, tasks, incidents, filter, setFilter, addTask }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
