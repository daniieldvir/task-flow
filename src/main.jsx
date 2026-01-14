import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlartsPanel from "./components/pages/AlartsPanel";
import IncidentsPanel from "./components/pages/IncidentsPanel";
import TasksPanel from "./components/pages/TasksPanel";

import {
  alartsData,
  incidentsData,
  taskData,
} from "./components/utils/dataFetch";
import OverviewPanel from "./Dashboard";

import RootLayout from "./components/Routes/RootLayout";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <OverviewPanel /> },
      { path: "/tasks", element: <TasksPanel />, loader: taskData },
      { path: "/alerts", element: <AlartsPanel />, loader: alartsData },
      {
        path: "/incidents",
        element: <IncidentsPanel />,
        loader: incidentsData,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
